import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

// Email validation schema
const emailSchema = z.object({
  email: z.string().email(),
  message: z.string().min(10).max(1000),
});

export async function POST(request: Request) {
  try {
    // Parse and validate the request body
    const body = await request.json();
    const { email, message } = emailSchema.parse(body);

    const response = await resend.emails.send({
       from: 'h.gaugler@plus-technology.co',
      to: ['h.gaugler@plus-technology.co'],
      subject: 'Nouvelle demande de licence',
      html: `
        <h2>Nouvelle demande de licence</h2>
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json(
      { message: 'Email sent successfully', response },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}