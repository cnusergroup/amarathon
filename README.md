# Amarathon 12-Hour Event Website

A Vue.js recreation of the Amarathon 12-hour technical conference website with pixel-perfect styling and responsive design.

## Project Setup

This project has been initialized with the following structure:

### Dependencies
- Vue.js 2.6.14
- SCSS/Sass for styling
- Day.js for date handling

### Directory Structure
```
src/
├── components/        # Vue components
│   └── index.vue     # Main Amarathon component
├── assets/
│   ├── images/
│   │   └── amarothon12/  # Event images (to be populated)
│   └── styles/
│       ├── variables.scss  # Design system variables
│       ├── mixins.scss     # Responsive mixins
│       └── base.scss       # Base styles and CSS reset
├── data/
│   └── agenda.js     # Speaker session data (36 sessions)
├── App.vue           # Root component
└── main.js           # Application entry point
```

## Getting Started

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

## Design System

### Responsive Breakpoints
- Desktop: 1920px (base)
- Tablet: 768px - 1199px
- Mobile: ≤767px

### Color Palette
- Primary Gradient: `linear-gradient(98deg, #2D62FF -24.99%, #BE52FF 107.17%)`
- Text Primary: `#232F3F`
- Text Secondary: `#545E6B`
- Background: `#FFFFFF`

### Typography
- Body: 14px / 22px line-height
- Title: 30px / 32px line-height

## Next Steps

The project foundation is complete. Next tasks include:
1. Download image assets
2. Implement main component structure
3. Build header and navigation
4. Create content sections (Main, Agenda, Committee)
5. Implement responsive design
6. Add interactive features

## Requirements

See `.kiro/specs/amarathon-website-clone/` for detailed:
- Requirements document
- Design document
- Implementation tasks
