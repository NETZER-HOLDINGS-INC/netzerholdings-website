# Netzer Holdings Website

Official website for Netzer Holdings - a diversified holdings company focused on home services and technology solutions.

## 🚀 Project Structure

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
└── tsconfig.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |

## 🌐 Deployment

This site is built with Astro and can be deployed to any static hosting platform:

- **Vercel**: Connect your repository and deploy automatically
- **Netlify**: Drag and drop the `dist` folder or connect via Git
- **DigitalOcean App Platform**: Deploy as a static site
- **GitHub Pages**: Use GitHub Actions for automated deployment

### Build Command
```bash
npm run build
```

### Output Directory
```
dist/
```

## 📝 Portfolio

The website showcases Netzer Holdings' portfolio including:

- **Chimney Services** - Professional chimney cleaning and inspection
- **Air Duct Cleaning** - HVAC maintenance and air quality services
- **Dryer Vent Services** - Fire prevention and efficiency improvement
- **Garage Door Services** - Installation and repair services
- **Atlanta Home Service Network** - Service professional platform

## 🧾 Invoice Generator

The website includes a professional invoice generator for subcontractors to bill Netzer Holdings companies.

### Features:
- **Itemized Line Items** - Add multiple services with quantity and rate
- **Company Selection** - Dropdown to select billing company (AHSN, Chimney, Air Duct, etc.)
- **Editable Company Info** - Customize company details as needed
- **Professional Formatting** - QuickBooks-style invoice layout
- **Print/Download** - Generate PDF invoices
- **Email Submission** - Automatically email invoices to billing department

### Configuration:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Configure email settings in `.env`:
   ```env
   INVOICE_EMAIL=billing@netzerholdings.com
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```

3. For Gmail, create an App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Generate a new app password
   - Use this password in `SMTP_PASS`

**Note:** If SMTP is not configured, invoices will be logged to the console in development mode.

## 🎨 Technology Stack

- **Astro** - Static site generator
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript

## 📧 Contact

For inquiries: info@netzerholdings.com

