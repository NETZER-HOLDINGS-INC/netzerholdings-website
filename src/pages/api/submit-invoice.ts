import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    // Get email configuration from environment variables
    const INVOICE_EMAIL = import.meta.env.INVOICE_EMAIL || 'billing@netzerholdings.com';
    const SMTP_HOST = import.meta.env.SMTP_HOST || 'smtp.gmail.com';
    const SMTP_PORT = parseInt(import.meta.env.SMTP_PORT || '587');
    const SMTP_USER = import.meta.env.SMTP_USER;
    const SMTP_PASS = import.meta.env.SMTP_PASS;

    // Validate required data
    if (!data.billTo || !data.from || !data.invoice || !data.lineItems) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create email transporter
    let transporter;
    
    if (SMTP_USER && SMTP_PASS) {
      // Use configured SMTP
      transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });
    } else {
      // For development/testing - log to console instead
      console.log('=== INVOICE SUBMISSION ===');
      console.log('Invoice Number:', data.invoice.number);
      console.log('From:', data.from.name, '-', data.from.email);
      console.log('Bill To:', data.billTo.company);
      console.log('Total:', `$${data.total.toFixed(2)}`);
      console.log('Line Items:', data.lineItems);
      console.log('Would send to:', INVOICE_EMAIL);
      console.log('========================');
      
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Invoice logged (SMTP not configured)',
        dev: true 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Prepare email content
    const emailSubject = `New Invoice Submission - ${data.invoice.number} from ${data.from.name}`;
    
    const emailText = `
New Invoice Received

Invoice Number: ${data.invoice.number}
Date: ${data.invoice.date}
${data.invoice.dueDate ? `Due Date: ${data.invoice.dueDate}` : ''}

FROM:
${data.from.name}
${data.from.email}
${data.from.phone || ''}
${data.from.address || ''}

BILL TO:
${data.billTo.company}
${data.billTo.address || ''}
${data.billTo.email || ''}

LINE ITEMS:
${data.lineItems.map((item: any) => 
  `${item.description} - Qty: ${item.quantity} x $${item.rate.toFixed(2)} = $${item.amount.toFixed(2)}`
).join('\n')}

TOTAL: $${data.total.toFixed(2)}

${data.invoice.notes ? `\nNOTES:\n${data.invoice.notes}` : ''}

---
This invoice was submitted via the Netzer Holdings Invoice Generator.
Please review and process accordingly.
    `.trim();

    // Send email
    await transporter.sendMail({
      from: `"Netzer Holdings Invoice System" <${SMTP_USER}>`,
      to: INVOICE_EMAIL,
      replyTo: data.from.email,
      subject: emailSubject,
      text: emailText,
      html: data.invoiceHTML,
    });

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Invoice submitted successfully' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error processing invoice:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process invoice',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

