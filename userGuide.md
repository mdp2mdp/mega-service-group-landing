# Мега-Сервис-Групп Landing Page - User Guide

## Website Overview

**Purpose:** Professional landing page for a comprehensive equipment supplier serving medical, educational, and administrative institutions across Russia.

**Access:** Public website - no login required

**Tech Stack:** React 19 + TypeScript + Tailwind CSS 4 + Express.js + MySQL Database with Manus OAuth integration, auto-scaling infrastructure with global CDN.

---

## Using Your Website

### Main Features

**1. Contact Form & Lead Capture**
The website includes a prominent contact form ("Оставить заявку") where potential clients can submit their project details. Click the form button, fill in your name, company, phone, email, and project description, then submit. The form includes validation and displays success/error messages. All submissions are processed and you'll receive notifications.

**2. Project Showcase**
The "Реализованные проекты" section displays before/after images of completed projects with descriptions. Each project card shows the client type, project description, and key results (timeline, budget optimization). This section helps demonstrate your company's capabilities to potential clients.

**3. FAQ Section**
The expandable FAQ section answers common questions about project timelines, guarantees, documentation requirements, and budget flexibility. Click any question to reveal the answer. This reduces support inquiries by addressing common concerns upfront.

**4. Call-to-Action Buttons**
Multiple CTAs are strategically placed:
- Phone button (tel: link) for direct calls
- WhatsApp integration for instant messaging
- "Оставить заявку" buttons throughout the page for form submissions
- "Посмотреть проекты" button to scroll to project showcase

---

## Managing Your Website

### Dashboard & Settings

Access the Management UI (right panel) to:

**Settings Panel**
- Update website title and logo (VITE_APP_TITLE, VITE_APP_LOGO)
- Manage visibility and domain settings
- View and update environment secrets (API keys, contact info)

**Database Panel**
- View and manage form submissions
- Access stored contact information
- Monitor lead data

**Preview Panel**
- Live preview of your website
- Test all interactive features
- Check responsive design on different devices

### Updating Content

**Edit Text Content**
All text content (hero headline, service descriptions, testimonials, FAQ answers) is stored in the Home.tsx component. To update:
1. Navigate to `client/src/pages/Home.tsx`
2. Edit the relevant text in the component
3. Save changes - the site updates automatically

**Update Images**
1. Place new images in `client/public/` directory
2. Update image paths in Home.tsx (e.g., `/hero-medical-equipment.jpg`)
3. Use descriptive filenames and include alt text for accessibility

**Modify Contact Information**
Update phone numbers, email, and address in:
- Header section (phone button, WhatsApp link)
- Footer section (contact details, company info)
- Contact form email recipient

**Change Company Details**
Update INN, OGРN, company name, and description in the footer and about section.

### Form Submissions

Contact form submissions include:
- Name, Company, Phone, Email
- Project Description
- Privacy agreement checkbox
- Automatic timestamps

Submissions are stored in the database and trigger notifications to the project owner.

### Analytics & Monitoring

The website integrates with Manus Analytics (VITE_ANALYTICS_ENDPOINT, VITE_ANALYTICS_WEBSITE_ID). View traffic, user behavior, and conversion metrics in the Dashboard panel.

---

## Next Steps

**Talk to Manus AI anytime** to request changes, add features, or improve your landing page.

**Suggested improvements:**
- Add Yandex Metrika integration for Russian market analytics
- Implement email notifications for form submissions
- Add customer testimonial videos
- Create downloadable company brochure
- Set up automated email responses for form submissions
- Add live chat support widget
- Implement multi-language support

**Get started now:** Share your feedback or request modifications to make this landing page perfectly match your business needs!
