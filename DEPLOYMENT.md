# Deployment Guide - Netzer Holdings Website

## Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager
- Domain: netzerholdings.com configured

## Quick Start

1. **Install Dependencies**
   ```bash
   cd netzerholdings-website
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Visit http://localhost:4321

3. **Build for Production**
   ```bash
   npm run build
   ```

## Deployment Options

### Option 1: Vercel (Recommended)

1. Push code to GitHub repository
2. Import project in Vercel dashboard
3. Configure:
   - **Framework Preset**: Astro
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add custom domain: netzerholdings.com
5. Deploy

### Option 2: Netlify

1. Build the site:
   ```bash
   npm run build
   ```

2. Deploy via Netlify CLI:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

3. Or drag and drop `dist` folder to Netlify dashboard

4. Configure custom domain in Netlify settings

### Option 3: DigitalOcean App Platform

1. Create new App in DigitalOcean
2. Connect GitHub repository
3. Configure:
   - **Type**: Static Site
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add domain netzerholdings.com
5. Deploy

### Option 4: GitHub Pages

1. Install gh-pages:
   ```bash
   npm install -D gh-pages
   ```

2. Add to package.json scripts:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

## DNS Configuration

Point your domain to your hosting provider:

**For Vercel:**
- A Record: 76.76.21.21
- CNAME: cname.vercel-dns.com

**For Netlify:**
- A Record: 75.2.60.5
- CNAME: [your-site].netlify.app

**For DigitalOcean:**
- Follow DigitalOcean's DNS configuration guide

## Environment Variables

No environment variables required for this static site.

## SSL/HTTPS

All recommended hosting providers (Vercel, Netlify, DigitalOcean) provide automatic SSL certificates via Let's Encrypt.

## Performance Optimization

The site is already optimized with:
- Static generation (no server required)
- Minimal JavaScript
- Tailwind CSS purging
- Optimized fonts (Google Fonts with preconnect)

## Monitoring

Consider adding:
- Google Analytics
- Vercel Analytics
- Plausible Analytics (privacy-focused)

## Support

For deployment issues, contact: info@netzerholdings.com

