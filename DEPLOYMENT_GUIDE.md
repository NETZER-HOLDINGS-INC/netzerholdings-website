# Deployment Guide - Netzer Holdings Website

## Overview

The website is built with Astro 5 and uses a Node.js server for handling invoice email submissions. It requires environment variables to be configured for email functionality.

## Environment Variables

The following environment variables must be set in your deployment platform:

### Required Variables

```env
INVOICE_EMAIL=general@netzerholdings.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Variable Descriptions

- **INVOICE_EMAIL**: The email address where all invoices will be sent (default: general@netzerholdings.com)
- **SMTP_HOST**: Your SMTP server hostname
- **SMTP_PORT**: SMTP port (usually 587 for TLS)
- **SMTP_USER**: Email account username for sending emails
- **SMTP_PASS**: Email account password or app-specific password

## Setting Up Gmail SMTP

### Step 1: Enable 2-Factor Authentication

1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification

### Step 2: Generate App Password

1. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
2. Select "Mail" as the app
3. Select "Other" as the device and name it "Netzer Holdings Website"
4. Click "Generate"
5. Copy the 16-character password (this is your `SMTP_PASS`)

### Step 3: Configure Environment Variables

Use the following values:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail-address@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx  # The 16-char app password from step 2
```

## DigitalOcean App Platform Deployment

### Setting Environment Variables

1. Go to your App in DigitalOcean App Platform
2. Click on "Settings" tab
3. Scroll to "App-Level Environment Variables"
4. Click "Edit"
5. Add each variable:
   - Key: `INVOICE_EMAIL`, Value: `general@netzerholdings.com`
   - Key: `SMTP_HOST`, Value: `smtp.gmail.com`
   - Key: `SMTP_PORT`, Value: `587`
   - Key: `SMTP_USER`, Value: `your-email@gmail.com`
   - Key: `SMTP_PASS`, Value: `your-app-password`
6. Click "Save"
7. The app will automatically redeploy

### Port Configuration

The application runs on port 4321 by default. Make sure your DigitalOcean app is configured to:

- **HTTP Port**: 4321
- **Health Check Path**: `/`

### Build Configuration

- **Build Command**: `npm run build`
- **Run Command**: `node ./dist/server/entry.mjs`

## Other SMTP Providers

### Microsoft Outlook/Office 365

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

### SendGrid

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

### Amazon SES

```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=your-ses-smtp-username
SMTP_PASS=your-ses-smtp-password
```

## Testing the Deployment

### 1. Check Build Logs

After deployment, check the build logs to ensure:
- No TypeScript errors
- Build completes successfully
- Server starts on port 4321

### 2. Test the Invoice Generator

1. Visit `https://netzerholdings.com/invoice-generator`
2. Fill out a test invoice
3. Click "📧 Submit Invoice"
4. Check that:
   - Success message appears
   - Email is received at general@netzerholdings.com

### 3. Check Server Logs

If emails aren't sending, check the server logs for:
- SMTP connection errors
- Authentication failures
- Missing environment variables

## Development Mode

When running locally without SMTP configuration:

1. Copy `.env.example` to `.env`
2. Leave SMTP variables empty or commented out
3. The system will log invoice submissions to the console instead of sending emails

```bash
npm run dev
```

## Troubleshooting

### Emails Not Sending

1. **Check environment variables are set correctly**
   - Verify in DigitalOcean App Platform settings
   - Ensure no extra spaces in values

2. **Gmail blocking sign-in**
   - Make sure you're using an App Password, not your regular password
   - Check if 2FA is enabled on your Google account

3. **SMTP connection timeout**
   - Verify SMTP_HOST and SMTP_PORT are correct
   - Check if your hosting provider blocks outbound SMTP connections

4. **Check server logs**
   - Look for error messages in the application logs
   - Common errors: "Invalid login", "Connection timeout", "Authentication failed"

### Build Failures

1. **TypeScript errors**
   - Run `npm run build` locally to see errors
   - Fix any type errors before deploying

2. **Missing dependencies**
   - Ensure `package-lock.json` is committed
   - Run `npm ci` to install exact versions

### Port Issues

If the app doesn't start:
- Verify the Dockerfile exposes port 4321
- Check DigitalOcean HTTP port configuration
- Ensure the run command is correct: `node ./dist/server/entry.mjs`

## Security Notes

- Never commit `.env` file to git (it's in `.gitignore`)
- Use app-specific passwords, not your main email password
- Rotate SMTP credentials periodically
- Monitor email sending for abuse

## Support

For deployment issues, contact:
- Email: info@netzerholdings.com
- Check server logs in DigitalOcean dashboard

