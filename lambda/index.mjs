import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event) => {
  let body;
  try {
    body = JSON.parse(event.body ?? '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { name, contact, message } = body;

  if (!name || !contact || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'All fields are required' }),
    };
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
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send message' }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true }),
  };
};
