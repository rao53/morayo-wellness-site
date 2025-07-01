# Morayo Wellness Initiative Website

## Overview
The official website for Morayo Wellness Initiative, a non-profit organization supporting Nigerian women who have experienced interpersonal violence through therapy funding and resources.

## Project Structure

```
morayo-wellness-site/
├── index.html              # Home page
├── about.html              # About page with mission, vision, and team info
├── our-work.html           # Services and programs information
├── resources.html          # Self-help resources and FAQs
├── get-involved.html       # Partnership and contact information
├── src/
│   ├── css/
│   │   ├── main.css        # Main stylesheet with all page styles
│   │   └── components/
│   │       ├── header.css  # Navigation styles
│   │       ├── footer.css  # Footer styles
│   │       └── forms.css   # Form styles
│   ├── js/
│   │   ├── main.js                 # Main JavaScript module
│   │   ├── navigation.js           # Navigation functionality
│   │   ├── animations.js           # General animations
│   │   ├── home-animations.js      # Home page specific animations
│   │   ├── page-animations.js      # Page scroll animations
│   │   ├── work-animations.js      # Our Work page animations
│   │   ├── contact-form.js         # Contact form functionality
│   │   └── forms.js                # Form validation
│   └── images/
│       ├── brand/
│       │   └── website_logo.png    # Organization logo
│       └── team/
│           └── mariam_sulaimon.jpeg # Founder's photo
├── CNAME                   # GitHub Pages custom domain
├── LICENSE                 # MIT License
├── CONTRIBUTING.md         # Contribution guidelines
└── SECURITY.md            # Security policy
```

## Page Navigation

The website has a consistent navigation structure across all pages:

- **Home** (`index.html`) - Landing page with hero section, about preview, services overview, and impact statistics
- **About** (`about.html`) - Organization story, founder info, team section, mission/vision/values
- **Our Work** (`our-work.html`) - Detailed services, how to get help, pilot program information
- **Resources** (`resources.html`) - Self-help resources, crisis contacts, FAQs
- **Get Involved** (`get-involved.html`) - Partnership opportunities, volunteer info, contact form

## Features

- **Responsive Design**: Mobile-first approach with breakpoints for tablets and desktops
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation support
- **Performance**: Optimized CSS and JavaScript, minimal dependencies
- **Visual Effects**: Smooth animations, glassmorphism, gradient effects
- **Contact Forms**: Dynamic form fields based on inquiry type
- **Interactive Elements**: Expandable FAQs, animated timelines, progress bars

## Dependencies

- **Alpine.js** (v3.x) - For interactive components
- **Font Awesome** (v6.0) - Icon library
- **Google Fonts** - Inter and Manrope fonts

## Local Development

1. Clone the repository
2. Serve the files using a local web server:
   ```bash
   python -m http.server 8000
   ```
3. Open `http://localhost:8000` in your browser

## Deployment

The site is configured for GitHub Pages deployment:
1. Push changes to the main branch
2. GitHub Pages will automatically deploy from the root directory
3. The site will be available at the custom domain specified in CNAME

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers on iOS and Android

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Security

For details about our security policy and how to report security issues, please see [SECURITY.md](SECURITY.md).