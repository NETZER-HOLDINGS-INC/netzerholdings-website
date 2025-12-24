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

#### Submit & Email
- Click **"Submit & Email Invoice"** to send directly to billing
- Invoice is automatically emailed to the appropriate billing department
- You'll see a success message when submitted
- Form will reset for your next invoice

## Email Configuration (For Administrators)

### Environment Variables

Create a `.env` file in the project root:

```env
# Where invoices will be sent
INVOICE_EMAIL=billing@netzerholdings.com

# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Gmail Setup

1. Go to [Google Account App Passwords](https://myaccount.google.com/apppasswords)
2. Generate a new app password
3. Use this password in `SMTP_PASS` (not your regular Gmail password)

### Other Email Providers

- **Outlook**: `smtp-mail.outlook.com`, port 587
- **Custom SMTP**: Use your provider's SMTP settings

### Development Mode

If SMTP is not configured:
- Invoices will be logged to the console
- No emails will be sent
- Useful for testing

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

### Invoice not sending?
- Check your internet connection
- Try downloading PDF and emailing manually
- Contact billing department to confirm receipt

### PDF not generating?
- Ensure all required fields are filled
- Try a different browser (Chrome recommended)
- Check browser console for errors

### Form validation errors?
- All fields marked with * are required
- Invoice number must be unique
- Email addresses must be valid format

## Support

For technical issues or questions:
- Email: info@netzerholdings.com
- Include your invoice number and description of the issue

## Privacy & Security

- All invoice data is transmitted securely
- Emails are sent via encrypted SMTP
- No invoice data is stored on our servers
- Your information is only used for billing purposes

