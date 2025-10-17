# Wendy's Whisk & Wonder - Bakery Website

A beautiful, homey bakery website for Wendy's baked goods business. This website features a classic, warm design with modern functionality.

## Features

- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Modern & Classic**: Clean, timeless design inspired by artisan bakeries
- **Interactive Elements**: Smooth scrolling, animated cards, and form validation
- **Contact Form**: Functional contact form with success feedback
- **Social Media Integration**: Direct links to Instagram (@myers6263)
- **SEO Friendly**: Semantic HTML structure

## Sections

1. **Home/Hero**: Eye-catching introduction with call-to-action buttons
2. **Featured Treats**: Showcase of signature baked goods
3. **About Me**: Personal story and connection with Wendy
4. **Gallery**: Visual showcase of baked creations
5. **Contact**: Contact form and business information

## Color Palette

- **Primary Color**: `#d4917e` (Warm terracotta/rose)
- **Secondary Color**: `#f4e8d8` (Cream/vanilla)
- **Accent Color**: `#8b6f5c` (Warm brown)
- **Background**: Cream and white tones for a homey feel

## Typography

- **Headings**: Playfair Display (serif) - Classic, elegant
- **Body**: Lato (sans-serif) - Clean, readable

## Getting Started

1. Simply open `index.html` in your web browser
2. No server or build process required
3. All files are self-contained

## File Structure

```
wendys-bakery/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # Interactive features
└── README.md          # This file
```

## Customization

### Adding Your Own Images

Replace the image placeholders by:

1. Create an `images` folder in the project directory
2. Add your images to the folder
3. Replace the `.image-placeholder` divs with `<img>` tags:

```html
<!-- Before -->
<div class="image-placeholder hero-placeholder">
    <i class="fas fa-birthday-cake"></i>
    <p>Hero Image</p>
</div>

<!-- After -->
<img src="images/your-image.jpg" alt="Description">
```

### Updating Contact Information

Edit the contact section in `index.html` to include:
- Your actual email address
- Phone number
- Business hours
- Location (if applicable)

### Connecting the Contact Form

The contact form currently shows a success message without sending data. To make it functional:

1. Set up a backend service (e.g., FormSpree, EmailJS, or your own server)
2. Update the form submission handler in `script.js`
3. Add your API endpoint or email service configuration

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Credits

- **Icons**: Font Awesome 6.4.0
- **Fonts**: Google Fonts (Playfair Display, Lato)
- **Design Inspiration**: Broma Bakery

## License

This website was created for Wendy's baking business. All content and design elements are for personal/business use.

---

**Wendy's Whisk & Wonder** - Baking happiness, one treat at a time! 🍰
