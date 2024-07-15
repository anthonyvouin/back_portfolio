import { Resend } from 'resend';
import dotenv from 'dotenv';
import { ContactProps } from '../interface/contact/contact';

dotenv.config();

const resend: Resend  = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(contactData : ContactProps): Promise<void> {

const htmlBody = `
    <p>Nouveau message de contact:</p>
    <ul>
      <li><strong>Prénom:</strong> ${contactData.firstName}</li>
      <li><strong>Nom:</strong> ${contactData.lastName}</li>
      <li><strong>Email:</strong> ${contactData.email}</li>
      <li><strong>Objet du mail:</strong> ${contactData.objet}</li>
    </ul>
    <p><strong>Message:</strong><br>${contactData.message}</p>
  `;

try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'anthony.vouin@outlook.fr',
      subject: 'Nouveau message de contact',
      html: htmlBody,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Internal server error');
  }
}