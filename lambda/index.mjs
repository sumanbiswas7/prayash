import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
