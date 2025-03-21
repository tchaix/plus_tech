import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { Email } from '../../components/Email';
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

    // Send email using Resend
    await resend.emails.send({
      from: email,
      to: 'h.gaugler@plus-technology.co',
      subject: 'New Contact',
      react: Email({ email , message }),
      html: `
        
      `,
    });

    return NextResponse.json(
      { message: 'Email sent successfully' },
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