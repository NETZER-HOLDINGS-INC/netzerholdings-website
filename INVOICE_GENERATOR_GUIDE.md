# Invoice Generator - User Guide

## Overview

The Netzer Holdings Invoice Generator is a professional tool for subcontractors to create and submit invoices for services rendered to any of our companies.

## Features

✅ **Professional QuickBooks-style formatting**
✅ **Itemized line items** with quantity and rate
✅ **Company selection dropdown** (AHSN, Chimney, Air Duct, Dryer Vent, Garage Door)
✅ **Editable company information**
✅ **Invoice preview** before submission
✅ **PDF download** capability
✅ **Automatic email submission** to billing department

## How to Use

### 1. Access the Invoice Generator

Navigate to: `https://netzerholdings.com/invoice-generator`

Or click "Invoice Generator" in the main navigation menu.

### 2. Fill Out Invoice Information

#### Bill To Section
- **Company**: Select from dropdown (AHSN, Chimney Services, Air Duct, etc.)
- **Invoice Date**: Automatically set to today (editable)
- **Company Name**: Auto-fills based on selection (editable)
- **Address & Email**: Auto-fills (editable)

#### From Section (Your Information)
- **Your Name/Business**: Required - Your name or business name
- **Your Email**: Required - Where you want replies sent
- **Phone**: Optional - Your contact number
- **Address**: Optional - Your business address

#### Invoice Details
- **Invoice Number**: Required - Your invoice tracking number (e.g., INV-001)
- **Due Date**: Optional - Payment due date

### 3. Add Line Items

Click **"+ Add Item"** to add services:

- **Description**: What service was provided (e.g., "Chimney Cleaning - 123 Main St")
- **Qty**: Quantity/hours (default: 1)
- **Rate**: Price per unit
- **Amount**: Automatically calculated (Qty × Rate)

You can add multiple line items. Click the trash icon to remove an item.

### 4. Add Notes (Optional)

Include payment terms, thank you message, or any additional information.

### 5. Submit Your Invoice

You have three options:

#### Preview Invoice
- Click **"Preview Invoice"** to see how it will look
- Review all information for accuracy

#### Download PDF
- Click **"Download PDF"** to save a copy to your computer
- File will be named: `Invoice-[YourInvoiceNumber].pdf`

#### Prepare Email & Download
- Click **"📧 Prepare Email & Download"** to:
  1. Automatically download the PDF invoice
  2. Open your default email client with pre-filled invoice details
  3. Attach the downloaded PDF to the email
  4. Send to the appropriate billing department
- Or manually email the PDF to the billing address shown

## How Email Submission Works

The invoice generator uses a **client-side approach** for email submission:

1. When you click "📧 Prepare Email & Download":
   - The PDF is automatically downloaded to your computer
   - Your default email client opens with:
     - Pre-filled recipient (billing department email)
     - Pre-filled subject line with invoice number
     - Pre-filled email body with invoice summary

2. You then:
   - Attach the downloaded PDF to the email
   - Review and send the email

This approach works with any email client (Gmail, Outlook, Apple Mail, etc.) and doesn't require server-side configuration.

## Company Billing Addresses

The following companies are pre-configured:

1. **American Home Services Network LLC** (AHSN)
   - Email: billing@ahsn.com

2. **Chimney Services Division**
   - Email: chimney-billing@ahsn.com

3. **Air Duct Services Division**
   - Email: airduct-billing@ahsn.com

4. **Dryer Vent Services Division**
   - Email: dryervent-billing@ahsn.com

5. **Garage Door Services Division**
   - Email: garagedoor-billing@ahsn.com

6. **Custom** - Manually enter company details

## Tips for Subcontractors

1. **Use consistent invoice numbering** (e.g., INV-001, INV-002, etc.)
2. **Be specific in descriptions** (include address, date of service)
3. **Keep a copy** - Always download a PDF for your records
4. **Include all details** - Phone and address help with payment processing
5. **Add payment terms** in the notes section (e.g., "Net 30")

## Troubleshooting

### Email client not opening?
- Your browser may be blocking the mailto link
- Download the PDF manually and compose the email yourself
- Copy the billing email address from the form

### PDF not generating?
- Ensure all required fields are filled
- Try a different browser (Chrome or Edge recommended)
- Check browser console for errors
- Disable browser extensions temporarily

### Form validation errors?
- All fields marked with * are required
- Invoice number should be unique for your records
- Email addresses must be valid format

### Email client opens but no attachment?
- The PDF downloads separately to your Downloads folder
- Manually attach the downloaded PDF file to the email
- Look for a file named `Invoice-[YourNumber].pdf`

## Support

For technical issues or questions:
- Email: info@netzerholdings.com
- Include your invoice number and description of the issue

## Privacy & Security

- All invoice generation happens in your browser (client-side)
- No invoice data is sent to or stored on our servers
- Emails are sent directly from your email client
- Your information is only used for billing purposes
- PDF files are generated locally on your device

