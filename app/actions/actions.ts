'use server';

import { EmailTemplate } from '@/components/Email';
import { getErrorMessage } from '@/lib/getErrorMessage';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  if (!process.env.RESEND_API_KEY) {
    console.error('Missing RESEND_API_KEY environment variable.');
    return { error: 'Email service is not configured.' };
  }

  try {
    // Cast `FormDataEntryValue` to string
    const formObject = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [
        key,
        value as string,
      ])
    );
    const { email, firstName, lastName } = formObject;

    if (!email || !firstName || !lastName) {
      return {
        error: 'Missing required fields: email, first name, or last name.',
      };
    }

    const message = `Welcome to the LITTO family, ${firstName} ${lastName} ${email}`;

    console.log(message);

    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // Replace with your verified domain
      to: [email as string],
      subject: `Welcome to the LITTO family, ${firstName}!`,
      replyTo: 'tommylitto@gmail.com',
      react: EmailTemplate({
        message,
        email,
      }),
    });

    return { success: true };
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    console.error('Error sending email:', error);
    return { error: errorMessage };
  }
};
