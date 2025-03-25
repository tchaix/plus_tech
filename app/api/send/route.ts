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

    const { data, error } = await resend.emails.send({
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

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Email sent successfully', data },
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