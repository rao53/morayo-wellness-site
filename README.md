# Morayo Wellness Initiative Website

This repository contains the website code for Morayo Wellness Initiative, a nonprofit organization providing mental health support to women and girls in Nigeria.

## Project Structure

```
morayo-wellness-site/
├── src/                      # Source files
│   ├── js/                   # JavaScript files
│   │   ├── main.js          # Main JavaScript entry point
│   │   ├── animations.js    # Animation-related code
│   │   ├── forms.js         # Form handling code
│   │   └── navigation.js    # Navigation-related code
│   ├── css/                 # CSS files
│   │   ├── main.css         # Main CSS file
│   │   └── components/      # Component-specific styles
│   │       ├── header.css
│   │       ├── footer.css
│   │       └── forms.css
│   └── images/             # Image assets
│       ├── team/           # Team member photos
│       └── brand/          # Brand assets like logos
├── public/                 # Built/public files
├── docs/                   # Documentation
├── CONTRIBUTING.md         # Contribution guidelines
├── LICENSE                 # MIT License
├── README.md              # This file
└── SECURITY.md            # Security policy
```

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/rao53/morayo-wellness-site.git
   cd morayo-wellness-site
   ```

2. Open `index.html` in your browser to view the site.

## Development

The website uses a modular structure:
- CSS is split into component-specific files and imported into `main.css`
- JavaScript is organized into modules and bundled through `main.js`
- Images and other assets are organized in the `src/images` directory

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Security

For details about our security policy and how to report security issues, please see [SECURITY.md](SECURITY.md).