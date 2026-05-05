import { Resend } from 'resend';
import { scryptSync, randomBytes, createHmac } from 'crypto';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import { students } from './schema.mjs';

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

function studentPayload(user) {
  return {
    registrationId: user.registrationId,
    studentName: user.studentName,
    studentNameBn: user.studentNameBn ?? '',
    klass: user.klass,
    school: user.school,
    dob: user.dob ?? '',
    address: user.address ?? '',
    guardianName: user.guardianName ?? '',
    phone: user.phone,
    email: user.email,
    createdAt: user.createdAt ? user.createdAt.toISOString() : null,
  };
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
    const { studentName, studentNameBn, klass, school, dob, address, guardianName, phone, email, password, notes } = body;
    if (!studentName || !klass || !school || !dob || !address || !phone || !email || !password) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) };
    }

    try {
      const { db, end } = getDb();
      const existing = await db.select({ id: students.id }).from(students).where(eq(students.email, email)).limit(1);
      await end();
      if (existing.length > 0) {
        return { statusCode: 409, body: JSON.stringify({ error: 'An account with this email already exists' }) };
      }
    } catch (err) {
      console.error('DB check failed:', err);
      return { statusCode: 500, body: JSON.stringify({ error: 'Registration failed' }) };
    }

    const registrationId = generateRegistrationId();
    const passwordHash = hashPassword(password);

    try {
      const { db, end } = getDb();
      const [student] = await db.insert(students).values({
        registrationId,
        studentName,
        studentNameBn: studentNameBn || null,
        klass,
        school,
        dob,
        address,
        guardianName: guardianName || null,
        phone,
        email,
        passwordHash,
        notes: notes || null,
      }).returning();
      await end();

      const studentData = studentPayload(student);

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

      return { statusCode: 200, body: JSON.stringify({ ok: true, registrationId, student: studentData }) };
    } catch (err) {
      if (err?.cause?.code === '23505') {
        return { statusCode: 409, body: JSON.stringify({ error: 'An account with this email already exists' }) };
      }
      console.error('DB insert failed:', err);
      return { statusCode: 500, body: JSON.stringify({ error: 'Registration failed' }) };
    }
  }

  if (body.type === 'login') {
    const { email, password } = body;
    if (!email || !password) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing fields' }) };
    }
    let user;
    try {
      const { db, end } = getDb();
      const rows = await db.select().from(students).where(eq(students.email, email)).limit(1);
      await end();
      user = rows[0];
    } catch (err) {
      console.error('DB query failed:', err);
      return { statusCode: 500, body: JSON.stringify({ error: 'Login failed' }) };
    }
    if (!user) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Invalid email or password' }) };
    }
    const [salt, hash] = user.passwordHash.split(':');
    const inputHash = scryptSync(password, salt, 64).toString('hex');
    if (inputHash !== hash) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Invalid email or password' }) };
    }
    return { statusCode: 200, body: JSON.stringify({ ok: true, student: studentPayload(user) }) };
  }

  if (body.type === 'magic-link-send') {
    const { email, origin } = body;
    if (!email) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing email' }) };
    }
    let user;
    try {
      const { db, end } = getDb();
      const rows = await db.select().from(students).where(eq(students.email, email)).limit(1);
      await end();
      user = rows[0];
    } catch (err) {
      console.error('DB query failed:', err);
      return { statusCode: 500, body: JSON.stringify({ error: 'Failed to send magic link' }) };
    }
    if (user) {
      const expires = Date.now() + 15 * 60 * 1000;
      const payload = `${email}|${expires}`;
      const sig = createHmac('sha256', process.env.MAGIC_SECRET || 'dev-secret').update(payload).digest('hex');
      const token = Buffer.from(JSON.stringify({ email, expires, sig })).toString('base64url');
      const link = `${origin}/auth?token=${token}`;
      await resend.emails.send({
        from: 'Proyash <proyash@sumanx.com>',
        to: email,
        subject: 'Your Proyash sign-in link',
        text: `Hi ${user.studentName},\n\nClick this link to sign in:\n\n${link}\n\nExpires in 15 minutes.\n\n— Proyash Team`,
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;">
            <p>Hi <strong>${user.studentName}</strong>,</p>
            <p>Click below to sign in — no password needed.</p>
            <a href="${link}" style="display:inline-block;background:#1f1b16;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin:12px 0;">Sign in to Proyash</a>
            <p style="color:#888;font-size:14px;margin-top:20px;">Expires in 15 minutes. If you didn't request this, ignore this email.</p>
            <p style="color:#888;font-size:14px;">— Proyash Team</p>
          </div>
        `,
      });
    }
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  }

  if (body.type === 'magic-link-verify') {
    const { token } = body;
    if (!token) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing token' }) };
    }
    let email, expires, sig;
    try {
      ({ email, expires, sig } = JSON.parse(Buffer.from(token, 'base64url').toString()));
    } catch {
      return { statusCode: 401, body: JSON.stringify({ error: 'Invalid token' }) };
    }
    const expectedSig = createHmac('sha256', process.env.MAGIC_SECRET || 'dev-secret').update(`${email}|${expires}`).digest('hex');
    if (sig !== expectedSig || Date.now() > expires) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Link expired or invalid' }) };
    }
    let user;
    try {
      const { db, end } = getDb();
      const rows = await db.select().from(students).where(eq(students.email, email)).limit(1);
      await end();
      user = rows[0];
    } catch (err) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Login failed' }) };
    }
    if (!user) {
      return { statusCode: 401, body: JSON.stringify({ error: 'No account found for this email' }) };
    }
    return { statusCode: 200, body: JSON.stringify({ ok: true, student: studentPayload(user) }) };
  }

  if (body.type === 'update-profile') {
    const { registrationId, studentName, studentNameBn, klass, school, dob, address, guardianName } = body;
    if (!registrationId || !studentName || !klass || !school || !dob || !address) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) };
    }
    try {
      const { db, end } = getDb();
      const rows = await db.update(students)
        .set({
          studentName,
          studentNameBn: studentNameBn || null,
          klass,
          school,
          dob,
          address,
          guardianName: guardianName || null,
        })
        .where(eq(students.registrationId, registrationId))
        .returning();
      await end();
      if (!rows.length) {
        return { statusCode: 404, body: JSON.stringify({ error: 'Student not found' }) };
      }
      return { statusCode: 200, body: JSON.stringify({ ok: true, student: studentPayload(rows[0]) }) };
    } catch (err) {
      console.error('Update failed:', err);
      return { statusCode: 500, body: JSON.stringify({ error: 'Update failed' }) };
    }
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
