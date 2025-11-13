# Implementation Plan

- [x] 1. Project Setup and Foundation
  - Initialize Vue.js project structure with necessary dependencies
  - Set up SCSS configuration with responsive mixins and design system variables
  - Create base directory structure for components, assets, and data files
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 1.1 Initialize project structure
  - Create package.json with Vue.js, SCSS, and Day.js dependencies
  - Set up webpack/Vue CLI configuration for SCSS processing
  - Create folder structure: src/components, src/assets/images/amarothon12, src/data
  - _Requirements: 1.1, 9.1_

- [x] 1.2 Create SCSS foundation files
  - Write responsive mixin functions (px2vw for pc, pad, mobile)
  - Define design system variables (colors, typography, spacing, breakpoints)
  - Create base styles with CSS reset and global transitions
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 6.10_

- [x] 1.3 Set up data files
  - Copy agenda.js with 36 speaker session objects
  - Verify data structure matches interface requirements
  - _Requirements: 8.1, 8.2_

- [x] 2. Download and Organize Image Assets
  - Use Playwright to download all required images from the original website
  - Organize images into appropriate folders (poster, home sections, photos, logos, icons)
  - Create placeholder images for missing assets
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

- [x] 2.1 Download poster images
  - Download poster.png, poster_pad.png, poster_mobile.png
  - Save to assets/images/amarothon12/
  - _Requirements: 9.2_

- [x] 2.2 Download home section images
  - Download home_desc, home_schedule, home_speaker images (all breakpoints)
  - Save with proper naming convention
  - _Requirements: 9.2_

- [x] 2.3 Download speaker photos
  - Download photos 1-36 for desktop (photo/{id}.png)
  - Download photos 1-36 for mobile (photo_mb/{id}.png)
  - _Requirements: 9.4_

- [x] 2.4 Download partner logos and icons
  - Download all partner logos (desktop and mobile versions)
  - Download social media icons (Twitter/X, Facebook, Instagram, GitHub, LinkedIn, WWW)
  - Download committee member photos
  - _Requirements: 9.3, 9.5_



- [x] 3. Create Main Component Structure
  - Build index.vue with template structure for all three tabs
  - Implement component data properties and computed properties
  - Set up lifecycle hooks for device detection and event listeners
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 8.3, 8.4_

- [x] 3.1 Create component template skeleton
  - Write template with poster, tabs, and conditional content sections
  - Add v-if directives for tab switching
  - Structure home, agenda, and committee sections
  - _Requirements: 1.1, 1.2, 1.3_

- [x] 3.2 Implement component data and methods
  - Define data properties (status, activeTab, deviceType, tabs, partners, navigation, translations)
  - Write changeTab method for tab switching
  - Implement handleResize for device type detection
  - Add/remove resize event listeners in lifecycle hooks
  - _Requirements: 1.3, 1.4, 5.1, 5.2, 5.3, 8.3_

- [x] 3.3 Create computed property for agenda data
  - Map agenda items with photo URLs using require()
  - Handle missing images with try-catch and fallback
  - _Requirements: 8.1, 8.2, 9.6_

- [x] 4. Implement Header and Navigation
  - Create poster section with responsive background images
  - Build tab navigation bar with active state styling
  - Implement tab switching functionality
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 7.1, 7.2_

- [x] 4.1 Style poster section
  - Apply background images for each breakpoint
  - Set heights using vw calculations (300px desktop, 500px tablet, 560px mobile)
  - Use background-size: cover
  - _Requirements: 1.1, 5.4, 5.6_

- [x] 4.2 Build tab navigation
  - Create tab buttons with title and subtitle
  - Apply white background with border
  - Implement active state with gradient border
  - Style text with proper colors and font weights
  - _Requirements: 1.2, 1.3, 1.4, 1.5, 6.1, 6.2, 6.5_

- [x] 4.3 Implement tab switching logic
  - Write @click handler calling changeTab method
  - Update activeTab data property
  - Apply active class conditionally
  - _Requirements: 1.3, 7.2_


- [x] 5. Build Main Page Content
  - Create description section with event details and action buttons
  - Implement schedule section with timeline information
  - Build speaker showcase section
  - Create partner logos section with multiple tiers
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8_

- [x] 5.1 Create description section
  - Build 1200px container with centered layout
  - Add description text background image
  - Implement button group with conditional rendering based on status
  - Style buttons with gradient background and border-radius
  - Add link to Bilibili replay
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 6.5, 7.4_

- [x] 5.2 Implement schedule section
  - Create container with gradient background
  - Add schedule background image (801px height)
  - Position clickable link areas for Slack and Terms
  - _Requirements: 2.5, 2.8, 7.4_

- [x] 5.3 Build speaker showcase
  - Create section with speaker background image (338px height)
  - Center content vertically
  - _Requirements: 2.6_

- [x] 5.4 Create partner logos section
  - Build three-tier structure (12小时直播联盟, 铂金赞助, 社区合作)
  - Render partner logos with links
  - Apply proper spacing and alignment
  - Handle responsive logo swapping (desktop vs mobile)
  - _Requirements: 2.7, 5.7, 7.4_


- [x] 6. Implement Agenda Section
  - Create agenda card layout with vertical list
  - Build individual agenda card components
  - Implement session information display
  - Add speaker details and social media icons
  - Apply scrollable content areas with gradient fades
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10_

- [x] 6.1 Create agenda section structure
  - Add background gradient layer
  - Create title and subtitle
  - Build cards container with 10px gaps
  - _Requirements: 3.1, 2.8_

- [x] 6.2 Build agenda card template
  - Create card with gradient border (10px padding, 12px border-radius)
  - Add session level badge positioned absolutely
  - Structure inner box with white background
  - _Requirements: 3.2, 3.10, 6.5_

- [x] 6.3 Implement session time display
  - Create two-column layout for UTC and Beijing times
  - Style timezone labels and values
  - Apply purple gradient to time values
  - _Requirements: 3.3, 6.1_

- [x] 6.4 Build session content area
  - Create scrollable description box (200px height)
  - Display session title with proper font size (24px)
  - Add language indicator with gradient text
  - Render session summary with pre-line white-space
  - Apply gradient fade effect at bottom
  - _Requirements: 3.4, 3.5, 3.6, 6.6, 6.10, 8.6_

- [x] 6.5 Implement speaker information section
  - Display speaker photo (46px width)
  - Show speaker name, country, and title
  - Apply border-top separator
  - Handle responsive layout (stack on mobile)
  - _Requirements: 3.7, 3.8, 5.5_

- [x] 6.6 Add social media icons
  - Render icons conditionally based on data availability
  - Apply proper sizing (18px height, some 15px)
  - Link to external profiles with target="_blank" and rel="noopener noreferrer"
  - _Requirements: 3.9, 7.4, 8.5_

- [x] 7. Implement Committee Section
  - Create sub-navigation for committee, judges, and advisers
  - Build committee member card layout
  - Implement scroll-to-section functionality
  - Apply alternating background colors
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9_

- [x] 7.1 Build committee sub-navigation
  - Create three navigation items with active state
  - Style with gradient background for active item
  - Implement click handlers calling changeNav method
  - _Requirements: 4.1, 4.2, 7.3_

- [x] 7.2 Implement scroll-to-section logic
  - Write changeNav method with ref-based scrolling
  - Calculate offset based on device type (124px pc, 70px pad/mobile)
  - Apply smooth scroll behavior
  - Update currNavId for active state
  - _Requirements: 4.2, 7.3_

- [x] 7.3 Create committee member cards
  - Build two-column grid layout with 20px gaps
  - Display member photo (180px width)
  - Create info sections for user details and committee role
  - Apply scrollable areas with gradient fades
  - Add social media icons at bottom
  - _Requirements: 4.3, 4.4, 4.5, 4.6, 4.7, 6.9, 6.10_

- [x] 7.4 Style judges and advisers sections
  - Apply white background for judges
  - Apply gradient background for advisers
  - Adjust card layouts for different content structures
  - _Requirements: 4.8, 4.9_



- [x] 8. Implement Responsive Design
  - Create tablet breakpoint styles (768px - 1199px)
  - Create mobile breakpoint styles (≤767px)
  - Adjust all spacing, typography, and layouts using vw calculations
  - Swap images for different device types
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8_

- [x] 8.1 Implement tablet styles
  - Add @media query for max-width 1199px
  - Convert all px values to pad-px2vw()
  - Adjust container widths (946px)
  - Swap to tablet-specific images
  - Reflow partner logos (wrap at 6 items)
  - _Requirements: 5.2, 5.4, 5.6_

- [x] 8.2 Implement mobile styles
  - Add @media query for max-width 767px
  - Convert all px values to mobile-px2vw()
  - Adjust container widths (690px, 672px)
  - Swap to mobile-specific images
  - Stack buttons vertically
  - Reflow agenda cards (time display horizontal, content stacked)
  - Hide desktop elements, show mobile elements
  - Adjust partner logo layout (wrap at 3 items)
  - _Requirements: 5.3, 5.4, 5.5, 5.6, 5.7, 5.8_

- [x] 8.3 Implement image swapping logic
  - Use deviceType computed property to select correct image
  - Apply conditional rendering for desktop vs mobile images
  - Handle partner logos with separate mobile versions
  - _Requirements: 5.7, 9.2_

- [x] 9. Add Interactive Features and Polish
  - Implement smooth transitions for all interactive elements
  - Add custom scrollbar styling
  - Apply hover effects to buttons and links
  - Ensure proper cursor styles
  - _Requirements: 6.8, 6.9, 7.1, 7.5_

- [x] 9.1 Style interactive elements
  - Add cursor: pointer to clickable elements
  - Implement hover effects for buttons
  - Apply transition: all 0.25s ease globally
  - Style disabled button states
  - _Requirements: 6.8, 7.1, 7.5, 7.6_

- [x] 9.2 Implement custom scrollbars
  - Style webkit-scrollbar with 4px width
  - Apply #D0DFF0 thumb color with 2px border-radius
  - Set white track background
  - _Requirements: 6.9_

- [x] 9.3 Add gradient fade effects
  - Apply ::after pseudo-elements for scrollable areas
  - Create gradient from transparent to white
  - Position at bottom of scrollable containers
  - _Requirements: 6.10_

- [x] 10. Implement Accessibility Features
  - Add alt text to all images
  - Ensure proper heading hierarchy
  - Implement keyboard navigation support
  - Add ARIA labels where needed
  - Verify color contrast ratios
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

- [x] 10.1 Add semantic HTML and ARIA
  - Use semantic elements (nav, section, article)
  - Add alt attributes to all img tags
  - Include ARIA labels for icon-only buttons
  - Ensure proper heading hierarchy (h1, h2, h3)
  - _Requirements: 10.1, 10.2, 10.5, 10.6_

- [x] 10.2 Implement keyboard navigation
  - Ensure tab order follows visual flow
  - Add visible focus indicators
  - Test keyboard-only navigation
  - _Requirements: 10.4_

- [ ]* 10.3 Verify accessibility compliance
  - Run automated accessibility tests (axe, Lighthouse)
  - Check color contrast ratios (WCAG AA)
  - Test with screen readers
  - _Requirements: 10.3, 10.6_

- [ ] 11. Testing and Quality Assurance
  - Test all interactive features
  - Verify responsive behavior at all breakpoints
  - Cross-browser testing
  - Performance optimization
  - _Requirements: All_

- [ ]* 11.1 Functional testing
  - Test tab switching functionality
  - Verify button states based on event status
  - Test scroll-to-section navigation
  - Validate external link behavior
  - _Requirements: 1.3, 2.2, 2.3, 2.4, 4.2, 7.3, 7.4_

- [ ]* 11.2 Responsive testing
  - Test at exact breakpoints (1199px, 767px)
  - Verify layout shifts and image swapping
  - Test on actual devices (desktop, tablet, mobile)
  - Check content overflow handling
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8_

- [ ]* 11.3 Cross-browser testing
  - Test on Chrome, Firefox, Safari, Edge
  - Test on mobile browsers (iOS Safari, Chrome Mobile)
  - Verify CSS compatibility
  - Check JavaScript functionality
  - _Requirements: All_

- [ ]* 11.4 Performance optimization
  - Optimize image sizes and formats
  - Minimize CSS and JavaScript
  - Test page load times
  - Verify smooth scrolling and animations
  - _Requirements: 9.7_

- [ ] 12. Final Polish and Refinement
  - Review implementation against design document
  - Fix any remaining styling inconsistencies
  - Ensure all requirements are met
  - _Requirements: All_

- [ ] 12.1 Review and fix styling details
  - Compare with original design for pixel-perfect accuracy
  - Adjust spacing, colors, and typography as needed
  - Verify gradient effects and transitions
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 6.10_

- [ ] 12.2 Complete event status logic
  - Implement dayjs date comparison for event status
  - Test button states for all three statuses (not started, live, ended)
  - Verify correct URLs are used for each environment
  - _Requirements: 2.2, 2.3, 2.4, 8.4_

- [ ] 12.3 Final integration verification
  - Test all three tabs (Main Page, Agenda, Committee)
  - Verify all images load correctly
  - Check all external links work properly
  - Ensure responsive behavior is smooth across all breakpoints
  - _Requirements: All_
