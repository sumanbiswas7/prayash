import { Resend } from 'resend';
import { scryptSync, randomBytes } from 'crypto';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { registrations } from './schema.mjs';

const resend = new Resend(process.env.RESEND_API_KEY);

function getDb() {
  const client = postgres(process.env.DATABASE_URL, {
    ssl: 'require',
    prepare: false,
    max: 1,
  });
  const db = drizzle(client);
  return { db, end: () => client.end() };
}

function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function generateRegistrationId() {
  return `PRY-2026-${Math.floor(Math.random() * 9000 + 1000)}`;
}

export const handler = async (event) => {
  let body;
  try {
    body = JSON.parse(event.body ?? '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  if (body.type === 'otp') {
    const { email, code, recipientName } = body;
    if (!email || !code) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing fields' }) };
    }
    const { error } = await resend.emails.send({
      from: 'Proyash <proyash@sumanx.com>',
      to: email,
      subject: 'Your Proyash verification code',
      text: `Hi ${recipientName || 'there'},\n\nYour verification code is: ${code}\n\nThis code expires in 10 minutes.\n\n— Proyash Team`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;">
          <p>Hi <strong>${recipientName || 'there'}</strong>,</p>
          <p>Your Proyash verification code is:</p>
          <div style="font-size:40px;letter-spacing:10px;font-family:monospace;background:#f5f3f0;padding:20px 24px;border-radius:10px;display:inline-block;margin:12px 0;">${code}</div>
          <p style="color:#888;font-size:14px;margin-top:20px;">This code expires in 10 minutes. If you didn't request this, ignore this email.</p>
          <p style="color:#888;font-size:14px;">— Proyash Team</p>
        </div>
      `,
    });
    if (error) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Failed to send OTP' }) };
    }
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  }

  if (body.type === 'register') {
    const { studentName, studentNameBn, klass, school, guardianName, phone, email, password, notes } = body;
    if (!studentName || !klass || !school || !phone || !email || !password) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) };
    }

    const registrationId = generateRegistrationId();
    const passwordHash = hashPassword(password);

    try {
      const { db, end } = getDb();
      await db.insert(registrations).values({
        registrationId,
        studentName,
        studentNameBn: studentNameBn || null,
        klass,
        school,
        guardianName: guardianName || null,
        phone,
        email,
        passwordHash,
        notes: notes || null,
      });
      await end();
    } catch (err) {
      console.error('DB insert failed:', err);
      return { statusCode: 500, body: JSON.stringify({ error: 'Registration failed' }) };
    }

    await resend.emails.send({
      from: 'Proyash <proyash@sumanx.com>',
      to: email,
      subject: `Thanks for registering, ${studentName}!`,
      text: `Hi ${studentName},\n\nThanks for registering. Go ahead and participate in the events!\n\nYour ID: ${registrationId}\n\n— Proyash Team`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;">
          <p>Hi <strong>${studentName}</strong>,</p>
          <p>Thanks for registering as a student for Proyash. Go ahead and participate in the events!</p>
          <p style="color:#888;font-size:14px;">Your ID: <strong style="color:#333;">${registrationId}</strong></p>
          <p style="color:#888;font-size:14px;">— Proyash Team</p>
        </div>
      `,
    });

    return { statusCode: 200, body: JSON.stringify({ ok: true, registrationId }) };
  }

  // Contact form
  const { name, contact, message } = body;
  if (!name || !contact || !message) {
    return { statusCode: 400, body: JSON.stringify({ error: 'All fields are required' }) };
  }
  const { error } = await resend.emails.send({
    from: 'Contact Form <proyash@sumanx.com>',
    to: 'hellosumanx@gmail.com',
    subject: `Proyash: New message from ${name}`,
    text: `Name: ${name}\nContact: ${contact}\n\n${message}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Contact:</strong> ${contact}</p>
      <hr />
      <p>${message.replace(/\n/g, '<br />')}</p>
    `,
  });
  if (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to send message' }) };
  }
  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
