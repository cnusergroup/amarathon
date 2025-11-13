# Design Document

## Overview

This document outlines the technical design for recreating the Amarathon 12-hour event website. The solution will be implemented as a Vue.js single-page application with SCSS styling, featuring a responsive design that adapts to desktop (1920px), tablet (1024px), and mobile (750px) viewports. The design emphasizes pixel-perfect recreation of the original styling while maintaining clean, maintainable code structure.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser (Client)                         │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Vue.js Application                        │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │         Main Component (index.vue)              │  │  │
│  │  │  ┌──────────────┬──────────────┬─────────────┐  │  │  │
│  │  │  │  Tab System  │ Main Content │  Committee  │  │  │  │
│  │  │  │  Navigation  │   Sections   │   Section   │  │  │  │
│  │  │  └──────────────┴──────────────┴─────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │         Data Layer (agenda.js)                  │  │  │
│  │  │  - 36 Speaker Sessions                          │  │  │
│  │  │  - Committee Member Data                        │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │         Styling Layer (SCSS)                    │  │  │
│  │  │  - Responsive Mixins                            │  │  │
│  │  │  - Design System Variables                      │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

- **Framework**: Vue.js 2.x (based on original code structure)
- **Styling**: SCSS with scoped styles
- **Build Tool**: Webpack (implied by Vue CLI setup)
- **Date Handling**: Day.js for event status calculation
- **Responsive Strategy**: CSS media queries with vw-based calculations

## Components and Interfaces

### Main Component Structure

The application consists of a single main component (`index.vue`) with the following structure:

```vue
<template>
  <div class="amarothon12">
    <!-- Poster Section -->
    <div class="amarothon12--poster"></div>
    
    <!-- Tab Navigation -->
    <div class="amarothon12--tabs-box">
      <!-- Tab buttons -->
    </div>
    
    <!-- Conditional Content Sections -->
    <div v-if="activeTab === 0" class="amarothon12--home">
      <!-- Main page content -->
    </div>
    
    <div v-if="activeTab === 1" class="amarothon12--agenda">
      <!-- Agenda content -->
    </div>
    
    <div v-if="activeTab === 3" class="amarothon12--organizing-committee">
      <!-- Committee content -->
    </div>
  </div>
</template>
```

### Component Data Structure

```javascript
{
  // Event status: 0=not started, 1=live, 2=ended
  status: Number,
  
  // URLs for different actions
  liveUrl: String,
  signUpUrl: String,
  questionnaireUrl: String,
  
  // Device type detection
  deviceType: String, // 'pc' | 'pad' | 'mobile'
  
  // Active tab tracking
  activeTab: Number, // 0=home, 1=agenda, 3=committee
  
  // Tab configuration
  tabs: Array<{id: Number, title: String, titleEn: String}>,
  
  // Partner data
  partners: Array<{
    title: String,
    logos: Array<{src: String, mobileSrc: String, link: String}>
  }>,
  
  // Navigation for committee section
  navigation: Array<{id: String, title: String, titleEn: String}>,
  currNavId: String,
  
  // Committee member data
  translations: {
    committee: Array<MemberData>,
    judges: Array<MemberData>,
    adviser: Array<MemberData>
  }
}
```

### Agenda Data Interface

```javascript
// agenda.js exports array of session objects
{
  id: Number,
  firstName: String,
  lastName: String,
  sessionTitle: String,
  sessionSummary: String,
  country: String,
  language: String,
  title: String,
  twitter: String | null,
  facebook: String | null,
  instagram: String | null,
  gitHub: String | null,
  linkedIn: String | null,
  other: String | null,
  sessionLevel: String, // "Level 200 Intermediate" | "Level 300 Advanced"
  sessionTimeUTC: String,
  sessionTimeBeijing: String
}
```

## Data Models

### Event Status Model

The event status is calculated dynamically based on the current date/time:

```javascript
// Status calculation logic
if (dayjs().isBefore("2024-11-23 12:00:00")) {
  status = 0; // Not started
} else if (dayjs().isBefore("2024-11-24 00:00:00")) {
  status = 1; // Live
} else {
  status = 2; // Ended
}
```

### Responsive Breakpoint Model

```scss
// Breakpoint definitions
$pc-width: 1920px;
$pad-width: 1024px;
$mobile-width: 750px;

$pad--max-width: 1199px;
$mobile--max-width: 767px;

// VW calculation functions
@function px2vw($px, $width) {
  @return $px / $width * 100vw;
}
```

### Design System Tokens

```scss
// Colors
$primary-gradient: linear-gradient(98deg, #2D62FF -24.99%, #BE52FF 107.17%);
$text-primary: #232F3F;
$text-secondary: #545E6B;
$text-tertiary: #556E8F;
$accent-purple: #555EFF;
$background-white: #FFFFFF;
$background-gray: #FAFAFA;
$border-color: #EAECF4;

// Typography
$font-size-body: 14px;
$font-size-title: 30px;
$font-size-subtitle: 20px;
$line-height-body: 22px;
$line-height-title: 32px;

// Spacing
$spacing-unit: 10px;
$container-width-desktop: 1200px;
$container-width-tablet: 946px;
$container-width-mobile: 690px;

// Border Radius
$radius-card: 12px;
$radius-button: 55px;
$radius-badge: 12px;
```

## Error Handling

### Image Loading Errors

```javascript
// Graceful fallback for missing images
computed: {
  agendas() {
    return agendas.flatMap((item) => {
      try {
        return {
          ...item,
          photo: require(`@/assets/images/amarothon12/photo/${item.id}.png`),
          mobilePhoto: require(`@/assets/images/amarothon12/photo_mb/${item.id}.png`)
        };
      } catch (error) {
        console.warn(`Missing photo for speaker ${item.id}`);
        return {
          ...item,
          photo: '/placeholder.png',
          mobilePhoto: '/placeholder.png'
        };
      }
    });
  }
}
```

### Device Type Detection

```javascript
methods: {
  handleResize() {
    const width = window.innerWidth;
    if (width > 1199) {
      this.deviceType = 'pc';
    } else if (width > 767) {
      this.deviceType = 'pad';
    } else {
      this.deviceType = 'mobile';
    }
  }
}
```

### Navigation Scroll Offset Calculation

```javascript
changeNav(nav) {
  let offsetTop = this.$refs[nav].offsetTop;
  
  // Adjust for fixed header height
  if (this.deviceType === 'pc') {
    offsetTop -= 124;
  } else if (this.deviceType === 'pad') {
    offsetTop -= 70;
  } else if (this.deviceType === 'mobile') {
    offsetTop -= 70;
  }
  
  this.currNavId = nav;
  
  window.scrollTo({
    top: offsetTop,
    left: 0,
    behavior: 'smooth'
  });
}
```

## Testing Strategy

### Unit Testing Approach

1. **Component Rendering Tests**
   - Verify correct tab rendering
   - Validate agenda card generation
   - Test committee member display

2. **Data Transformation Tests**
   - Test agenda data mapping with photo URLs
   - Validate event status calculation
   - Test device type detection logic

3. **User Interaction Tests**
   - Tab switching functionality
   - Navigation scroll behavior
   - External link handling

### Visual Regression Testing

1. **Screenshot Comparison**
   - Capture screenshots at all breakpoints
   - Compare against original design
   - Validate responsive transformations

2. **Cross-Browser Testing**
   - Chrome, Firefox, Safari, Edge
   - Mobile browsers (iOS Safari, Chrome Mobile)

### Responsive Design Testing

1. **Breakpoint Validation**
   - Test at exact breakpoint widths (1199px, 767px)
   - Verify layout shifts
   - Check image swapping (desktop vs mobile versions)

2. **Content Overflow Testing**
   - Long text in session summaries
   - Many social media icons
   - Variable committee member descriptions

## Implementation Phases

### Phase 1: Project Setup and Structure
- Initialize Vue.js project
- Set up SCSS with responsive mixins
- Create base component structure
- Import agenda data

### Phase 2: Main Page Implementation
- Implement poster section
- Create tab navigation system
- Build description section with buttons
- Add schedule section
- Implement speaker showcase
- Create partner logos section

### Phase 3: Agenda Section Implementation
- Create agenda card component structure
- Implement session time display
- Add speaker information layout
- Integrate social media icons
- Apply scrollable content areas
- Add gradient borders and styling

### Phase 4: Committee Section Implementation
- Build sub-navigation system
- Create committee member cards
- Implement judges section
- Add adviser section
- Apply scroll-to-section functionality
- Style with alternating backgrounds

### Phase 5: Responsive Design Implementation
- Implement tablet breakpoint styles
- Implement mobile breakpoint styles
- Test and adjust vw calculations
- Swap images for different devices
- Adjust layouts for smaller screens

### Phase 6: Polish and Optimization
- Add smooth transitions
- Implement custom scrollbars
- Apply gradient fade effects
- Optimize image loading
- Add accessibility features
- Cross-browser testing

## Asset Requirements

### Image Assets Needed

1. **Poster Images**
   - `poster.png` (1920x300px)
   - `poster_pad.png` (1024x500px)
   - `poster_mobile.png` (750x560px)

2. **Home Section Images**
   - `home_desc.png`, `home_desc_pad.png`, `home_desc_mobile.png`
   - `home_schedule.png`, `home_schedule_pad.png`, `home_schedule_mb.png`
   - `home_speaker.png`, `home_speaker_pad.png`, `home_speaker_mobile.png`

3. **Partner Logos**
   - Desktop and mobile versions for each partner
   - InfoQ, SegmentFault, ITPUB, GitCode, MSUP, RTE
   - Simba, OSChina, CSDN

4. **Speaker Photos**
   - `photo/1.png` through `photo/36.png`
   - `photo_mb/1.png` through `photo_mb/36.png`

5. **Committee Photos**
   - Various member photos with desktop and mobile versions

6. **Icon Assets**
   - Social media icons (Twitter/X, Facebook, Instagram, GitHub, LinkedIn, WWW)
   - Navigation icons

## Performance Considerations

### Image Optimization
- Use WebP format with PNG fallback
- Implement lazy loading for below-fold images
- Provide appropriate image sizes for each breakpoint

### CSS Optimization
- Use CSS containment for independent sections
- Minimize repaints with transform/opacity animations
- Leverage GPU acceleration for smooth scrolling

### JavaScript Optimization
- Debounce resize event handler
- Use computed properties for derived data
- Minimize DOM manipulations

## Accessibility Features

### Keyboard Navigation
- Tab order follows visual flow
- Focus indicators on interactive elements
- Skip links for main content areas

### Screen Reader Support
- Semantic HTML structure
- ARIA labels for icon-only buttons
- Alt text for all images
- Proper heading hierarchy

### Color Contrast
- All text meets WCAG AA standards
- Interactive elements have sufficient contrast
- Focus indicators are clearly visible

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari iOS 14+
- Chrome Mobile Android 90+

## Deployment Considerations

### Build Configuration
- Minify CSS and JavaScript
- Optimize images during build
- Generate source maps for debugging
- Configure CDN for static assets

### Environment Variables
- API endpoints for different environments
- Feature flags for A/B testing
- Analytics tracking IDs

### Monitoring
- Error tracking (e.g., Sentry)
- Performance monitoring (Core Web Vitals)
- User analytics (page views, interactions)
