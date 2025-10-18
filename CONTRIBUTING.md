# Contributing to GrowSphere Studios Website

Thank you for your interest in contributing to the GrowSphere Studios website! This document provides guidelines and information for contributors.

## Development Setup

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Git

### Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Copy and configure `.env.local` with your email settings
4. Run development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── api/            # API routes
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Homepage
├── components/         # React components
├── hooks/              # Custom React hooks
├── lib/                # Core utilities and data access
├── types/              # TypeScript type definitions
├── constants/          # Application constants
└── utils/              # Helper functions
```

## Code Style Guidelines

### TypeScript
- Use TypeScript for all new files
- Define proper interfaces for all data structures
- Use proper typing, avoid `any` when possible
- Export types from `@/types` for reusability

### React Components
- Use functional components with hooks
- Follow the Single Responsibility Principle
- Use descriptive component and prop names
- Implement proper error boundaries where needed

### Styling
- Use Tailwind CSS utility classes
- Maintain responsive design principles
- Follow the established color scheme in `tailwind.config.js`
- Keep accessibility in mind (proper contrast, semantic HTML)

### File Organization
- Components should be in PascalCase (e.g., `MyComponent.tsx`)
- Utilities and hooks should be in camelCase
- Use index files for clean imports
- Group related functionality together

## Data Management

### Data Structure
- Business data is stored in `data.json`
- Access data through functions in `src/lib/data.ts`
- Use proper TypeScript interfaces from `@/types`

### Adding New Projects
1. Add project data to `data.json` in the `projects` array
2. Include all required fields: `id`, `title`, `description`, `image`, `link`, `category`, `status`, `clientName`, `completedDate`, `technologies`, `features`
3. Add corresponding testimonial if available
4. Update project images in the `public/images/` directory

### Adding New Services
1. Add service data to `data.json` in the `services` array
2. Include pricing information if available
3. Update the Services component if new icons are needed

## Testing

### Manual Testing Checklist
- [ ] All pages load without errors
- [ ] Contact form submits successfully
- [ ] Portfolio filtering works correctly
- [ ] Responsive design on mobile, tablet, and desktop
- [ ] All links and buttons function properly
- [ ] Images load correctly
- [ ] SEO metadata is present

### Performance Testing
- Use Chrome DevTools Lighthouse for performance auditing
- Aim for 90+ performance score
- Check Core Web Vitals metrics

## Deployment

### Development Deployment
- Push changes to development branch
- Test thoroughly before merging

### Production Deployment
- Ensure all environment variables are configured
- Run `npm run build` to check for build errors
- Test in production-like environment before deploying

## Common Tasks

### Adding a New Component
1. Create component file in `src/components/`
2. Export from component file
3. Import and use in parent component
4. Add proper TypeScript interfaces
5. Follow established patterns for styling

### Updating Business Information
1. Edit `data.json` with new information
2. Update corresponding images if needed
3. Test changes across all components

### Adding New Pages
1. Create page file in `src/app/`
2. Add navigation links if needed
3. Update SEO metadata
4. Test routing and functionality

## Git Workflow

### Branch Naming
- `feature/description` for new features
- `fix/description` for bug fixes
- `docs/description` for documentation updates

### Commit Messages
- Use clear, descriptive commit messages
- Start with action verb (Add, Fix, Update, Remove)
- Keep first line under 50 characters
- Add detailed description if needed

### Pull Requests
- Provide clear description of changes
- Include screenshots for UI changes
- Ensure all tests pass
- Request review before merging

## Support

For questions or support:
- Email: growsphere@zohomail.in
- Create an issue in the repository
- Review existing documentation

## License

This project is proprietary. Please respect intellectual property rights.
