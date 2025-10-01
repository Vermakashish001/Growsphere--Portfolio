# WebCraft Studios - Small Business Portfolio Website

A modern, responsive portfolio website built with Next.js and Tailwind CSS for a company that creates websites for small businesses like gyms, schools, and local shops.

## Features

- **Modern Design**: Clean, professional interface with a balanced color scheme
- **Fully Responsive**: Mobile-first design that works perfectly on all devices
- **Smooth Animations**: Subtle animations and smooth scrolling navigation
- **Interactive Components**: Dynamic testimonial carousel, portfolio filtering, and contact form
- **SEO Optimized**: Built-in Next.js SEO optimizations for better search visibility
- **Fast Performance**: Optimized loading speeds with Next.js features

## Sections

### 🏠 Homepage Hero
- Compelling hero section introducing the company
- Clear value proposition for small businesses
- Call-to-action buttons for engagement
- Statistics showcasing company achievements

### 🛠️ Services
- Comprehensive service offerings
- Detailed feature lists for each service
- Hover effects and animations
- Mobile-optimized cards

### 📁 Portfolio
- Filterable project showcase
- Project categories (Gyms, Schools, Shops)
- Detailed project information
- Technology stacks and features

### 💬 Testimonials
- Auto-rotating testimonial carousel
- Client ratings and feedback
- Manual navigation controls
- Business statistics

### 📞 Contact
- Professional contact form with validation
- Multiple contact methods
- Form submission handling
- Responsive design

### 📄 Footer
- Company information
- Quick navigation links
- Social media integration
- Legal pages

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - Modern React patterns
- **Intersection Observer API** - Scroll-triggered animations
- **Nodemailer** - Email handling for contact form
- **Gmail SMTP** - Email delivery service

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager
- Gmail account (for contact form functionality)

### Installation

1. Clone or download the project
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up email configuration for the contact form:
   - Copy `.env.local` to your project root (it's already there)
   - Update the email settings with your Gmail credentials:

```bash
# For Gmail setup:
# 1. Go to your Google Account settings
# 2. Enable 2-factor authentication
# 3. Generate an App Password: https://support.google.com/accounts/answer/185833
# 4. Update .env.local with your credentials:

EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
EMAIL_TO=your-email@gmail.com
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Contact Form Setup

The contact form uses Nodemailer with Gmail SMTP. To set it up:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. **Update `.env.local`** with your credentials
4. **Test the form** by submitting a message

**Note**: The contact form will show a configuration error until you set up proper email credentials.

### Building for Production

```bash
npm run build
npm run start
```

## Customization

### Colors
The color scheme can be customized in `tailwind.config.js`. The default uses a blue primary color scheme suitable for professional services.

### Content
- Update company information in components
- Replace placeholder images with actual project screenshots
- Modify service offerings to match your business
- Update contact information and social media links

### Animations
Animations are implemented using CSS transitions and the Intersection Observer API for scroll-triggered effects.

## File Structure

```
src/
├── app/
│   ├── globals.css      # Global styles and Tailwind imports
│   ├── layout.tsx       # Root layout component
│   └── page.tsx         # Main homepage
└── components/
    ├── Navbar.tsx       # Navigation component
    ├── Hero.tsx         # Hero section
    ├── Services.tsx     # Services showcase
    ├── Portfolio.tsx    # Portfolio with filtering
    ├── Testimonials.tsx # Client testimonials
    ├── Contact.tsx      # Contact form and info
    └── Footer.tsx       # Footer component
```

## Browser Support

This website supports all modern browsers including:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Performance

- Lighthouse Performance Score: 90+
- First Contentful Paint: < 2s
- Largest Contentful Paint: < 3s
- Cumulative Layout Shift: < 0.1

## Deployment

This Next.js application can be deployed on:
- Vercel (recommended)
- Netlify
- AWS
- Any hosting provider that supports Node.js

## License

This project is created for demonstration purposes. Please customize and use according to your needs.

## Support

For questions or support regarding this website template, please refer to the Next.js and Tailwind CSS documentation.