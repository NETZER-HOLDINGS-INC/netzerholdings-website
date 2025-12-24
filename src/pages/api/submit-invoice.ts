import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';
import { saveInvoice, getNextInvoiceNumber } from '../../lib/db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    // Get email configuration from environment variables
    // Use process.env for runtime variables in server-side code
    const INVOICE_EMAIL = process.env.INVOICE_EMAIL || 'general@netzerholdings.com';
    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_PORT = process.env.SMTP_PORT || '587';
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;

    // Debug logging (remove in production if needed)
    console.log('Environment check:', {
      hasHost: !!SMTP_HOST,
      hasUser: !!SMTP_USER,
      hasPass: !!SMTP_PASS,
      invoiceEmail: INVOICE_EMAIL
    });

    // Validate required data
    if (!data.billTo || !data.from || !data.lineItems) {
      return new Response(JSON.stringify({ error: 'Missing required invoice data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Generate invoice number if not provided
    const invoiceNumber = data.invoiceNumber || getNextInvoiceNumber();
    const invoiceDate = data.invoiceDate || new Date().toISOString().split('T')[0];

    // Save invoice to database
    const invoiceId = saveInvoice({
      invoice_number: invoiceNumber,
      contractor_name: data.from.name,
      contractor_email: data.from.email,
      contractor_phone: data.from.phone,
      contractor_address: data.from.address,
      company_key: data.billTo.companyKey,
      company_name: data.billTo.company,
      company_address: data.billTo.address,
      company_email: data.billTo.email,
      invoice_date: invoiceDate,
      due_date: data.dueDate,
      notes: data.notes,
      total: data.total,
      line_items: JSON.stringify(data.lineItems),
      status: 'submitted'
    });

    console.log(`Invoice saved to database: ID ${invoiceId}, Number ${invoiceNumber}`);

    // Create email HTML
    const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 800px; margin: 0 auto; padding: 20px; }
          .header { background: #1e40af; color: white; padding: 20px; text-align: center; }
          .invoice-details { background: #f3f4f6; padding: 20px; margin: 20px 0; }
          .section { margin: 20px 0; }
          .section-title { font-weight: bold; color: #1e40af; margin-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th { background: #1e40af; color: white; padding: 12px; text-align: left; }
          td { padding: 10px; border-bottom: 1px solid #e5e7eb; }
          .total { font-size: 1.2em; font-weight: bold; text-align: right; padding: 20px; background: #f3f4f6; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Invoice Submission</h1>
            <p>Invoice #${invoiceNumber}</p>
          </div>

          <div class="invoice-details">
            <div class="section">
              <div class="section-title">Bill To:</div>
              <p>
                <strong>${data.billTo.company}</strong><br>
                ${data.billTo.address || ''}<br>
                ${data.billTo.email || ''}
              </p>
            </div>

            <div class="section">
              <div class="section-title">From:</div>
              <p>
                <strong>${data.from.name}</strong><br>
                ${data.from.email}<br>
                ${data.from.phone || 'N/A'}<br>
                ${data.from.address || 'N/A'}
              </p>
            </div>

            <div class="section">
              <div class="section-title">Invoice Details:</div>
              <p>
                <strong>Invoice Number:</strong> ${invoiceNumber}<br>
                <strong>Invoice Date:</strong> ${invoiceDate}<br>
                <strong>Due Date:</strong> ${data.dueDate || 'N/A'}
              </p>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Line Items:</div>
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Rate</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                ${data.lineItems.map((item: any) => `
                  <tr>
                    <td>${item.description}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.rate.toFixed(2)}</td>
                    <td>$${item.amount.toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="total">
            Total: $${data.total.toFixed(2)}
          </div>

          ${data.notes ? `
            <div class="section">
              <div class="section-title">Notes:</div>
              <p>${data.notes}</p>
            </div>
          ` : ''}

          <div style="margin-top: 40px; padding: 20px; background: #f9fafb; border-left: 4px solid #1e40af;">
            <p><strong>This is an automated invoice submission from the Netzer Holdings Invoice Generator.</strong></p>
            <p>Invoice has been saved to the system with ID: ${invoiceId}</p>
            <p>Please review the attached PDF and process accordingly.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Prepare PDF attachment if provided
    const attachments = [];
    if (data.pdfData) {
      // PDF data is base64 encoded from the frontend
      const pdfBuffer = Buffer.from(data.pdfData.split(',')[1], 'base64');
      attachments.push({
        filename: `Invoice-${invoiceNumber}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf'
      });
    }

    // If SMTP is configured, send email
    if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: parseInt(SMTP_PORT),
        secure: false,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Netzer Holdings Invoice System" <${SMTP_USER}>`,
        to: INVOICE_EMAIL,
        replyTo: data.from.email,
        subject: `Invoice #${invoiceNumber} from ${data.from.name} - $${data.total.toFixed(2)}`,
        html: emailHTML,
        attachments: attachments
      });

      console.log(`Invoice #${invoiceNumber} sent to ${INVOICE_EMAIL} with ${attachments.length > 0 ? 'PDF attachment' : 'no attachment'}`);
    } else {
      // Development mode - just log
      console.log('=== INVOICE SUBMISSION (SMTP NOT CONFIGURED) ===');
      console.log(`To: ${INVOICE_EMAIL}`);
      console.log(`From: ${data.from.name} <${data.from.email}>`);
      console.log(`Invoice #: ${invoiceNumber}`);
      console.log(`Total: $${data.total.toFixed(2)}`);
      console.log(`PDF Attached: ${attachments.length > 0 ? 'Yes' : 'No'}`);
      console.log('===============================================');
    }

    return new Response(JSON.stringify({
      success: true,
      invoiceNumber: invoiceNumber,
      invoiceId: invoiceId
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error processing invoice:', error);
    return new Response(JSON.stringify({ error: 'Failed to process invoice' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

