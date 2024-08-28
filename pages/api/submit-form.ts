import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, handle, checkboxes, project, artists, belief } = req.body;

    // Create a Nodemailer transporter
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "your-smtp-host",
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      // Send email
      await transporter.sendMail({
        from: `"Asylum Ventures" <${process.env.EMAIL_USER}>`,
        to: process.env.RECIPIENT_EMAIL || "recipient@example.com",
        subject: "New Contact Form Submission from Asylum Ventures",
        text: `
          New submission from ${name}:
          
          Handle: ${handle}
          
          Checkboxes:
          ${Object.entries(checkboxes)
            .filter(([_, value]) => value)
            .map(([key, _]) => `- ${key.toUpperCase().replace(/_/g, ' ')}`)
            .join('\n')}
          
          Project:
          ${project}
          
          Favorite Artists:
          ${artists}
          
          Unique Belief:
          ${belief}
        `,
        html: `
          <h1>New submission from ${name}</h1>
          <p><strong>Handle:</strong> ${handle}</p>
          
          <h2>Checkboxes:</h2>
          <ul>
            ${Object.entries(checkboxes)
              .filter(([_, value]) => value)
              .map(([key, _]) => `<li>${key.toUpperCase().replace(/_/g, ' ')}</li>`)
              .join('')}
          </ul>
          
          <h2>Project:</h2>
          <p>${project.replace(/\n/g, '<br>')}</p>
          
          <h2>Favorite Artists:</h2>
          <p>${artists.replace(/\n/g, '<br>')}</p>
          
          <h2>Unique Belief:</h2>
          <p>${belief.replace(/\n/g, '<br>')}</p>
        `,
      });

      res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error submitting form' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}