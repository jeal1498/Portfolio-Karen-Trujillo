import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import path from 'path';
import fs from 'fs';

type LeadType = 'tdah-ninos' | 'tdah-adultos';

const PDF_MAP: Record<LeadType, { filename: string; subject: string; heading: string }> = {
  'tdah-ninos': {
    filename: 'checklist-tdah-ninos.pdf',
    subject: 'Tu checklist TDAH para niños — Karen Trujillo',
    heading: 'el checklist para hablar con el médico de tu hijo',
  },
  'tdah-adultos': {
    filename: 'checklist-tdah-adultos.pdf',
    subject: 'Tu checklist TDAH adultos — Karen Trujillo',
    heading: 'el checklist de patrones de TDAH en adultos',
  },
};

type ResponseData = { ok: true } | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, lead } = req.body as { name?: string; email?: string; lead?: string };

  if (!name || !email || !lead) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Email inválido' });
  }

  const meta = PDF_MAP[lead as LeadType];
  if (!meta) {
    return res.status(400).json({ error: 'Tipo de lead inválido' });
  }

  const pdfPath = path.join(process.cwd(), 'public', 'downloads', meta.filename);

  if (!fs.existsSync(pdfPath)) {
    // PDF aún no generado — igual registra el lead y notifica
    console.warn(`[lead-magnet] PDF no encontrado: ${pdfPath}`);
    return res.status(503).json({ error: 'PDF no disponible aún' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY no configurada');
  }

  const resend = new Resend(apiKey);
  const pdfBuffer = fs.readFileSync(pdfPath);

  await resend.emails.send({
    from: 'Karen Trujillo <hola@psicologakarentrujillo.com.mx>',
    to: email,
    subject: meta.subject,
    html: `
      <div style="font-family: 'Montserrat', Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #382f51;">
        <div style="background: #382f51; padding: 32px 32px 24px; border-radius: 12px 12px 0 0;">
          <p style="color: #c6bce2; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 4px;">Karen Trujillo · Neuropsicóloga en Cancún</p>
        </div>
        <div style="background: #fafafa; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e8e4f0;">
          <p style="font-size: 16px; margin: 0 0 16px;">Hola ${name},</p>
          <p style="font-size: 15px; line-height: 1.7; margin: 0 0 16px;">
            Aquí tienes ${meta.heading} que solicitaste. Lo encontrarás adjunto a este correo.
          </p>
          <p style="font-size: 15px; line-height: 1.7; margin: 0 0 24px;">
            Si tienes preguntas o quieres agendar una valoración, puedes escribirme directamente por WhatsApp:
          </p>
          <a href="https://wa.me/529983211547?text=Hola%20Karen%2C%20recibí%20tu%20checklist%20y%20tengo%20una%20pregunta"
             style="display: inline-block; background: #25d366; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 13px; letter-spacing: 0.05em;">
            Escribir por WhatsApp
          </a>
          <p style="font-size: 12px; color: #888; margin: 32px 0 0; line-height: 1.6;">
            Cédula Federal 11009616 · psicologakarentrujillo.com.mx<br>
            Cancún, Quintana Roo
          </p>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: meta.filename,
        content: pdfBuffer,
      },
    ],
  });

  return res.status(200).json({ ok: true });
}
