import { EmailTemplate } from '@/components/Email';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName } = body;

    // Validate required fields
    if (!email || !firstName) {
      return NextResponse.json(
        { message: 'Email and first name are required.' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // Replace with your verified domain
      to: [email],
      subject: `Welcome to the LITTO family, ${firstName}!`,
      react: EmailTemplate(firstName), // Use the actual firstName from body
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    console.error('Error sending email:', error);

    return NextResponse.json(
      { message: 'Failed to send email.', error: (error as Error).message },
      { status: 500 }
    );
  }
}
