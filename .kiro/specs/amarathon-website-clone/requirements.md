# Requirements Document

## Introduction

This project aims to recreate the Amarathon 12-hour event website with pixel-perfect styling matching the original design. The website showcases a technical conference with multiple speakers, agenda items, organizing committee members, and partner information. The site must be fully responsive across desktop, tablet, and mobile devices.

## Glossary

- **Amarathon**: A 12-hour technical conference/livestream event
- **System**: The event website application
- **User**: Website visitor viewing event information
- **Responsive Design**: Layout that adapts to different screen sizes (PC: 1920px, Tablet: 1024px, Mobile: 750px)
- **Tab Navigation**: Main navigation system with three sections (Main Page, Agenda, Committee)
- **Agenda Item**: Individual session/talk information including speaker details
- **Committee Member**: Organizing team member profile
- **Partner**: Sponsoring organization

## Requirements

### Requirement 1: Website Structure and Navigation

**User Story:** As a user, I want to navigate between different sections of the website, so that I can access event information, agenda, and committee details.

#### Acceptance Criteria

1. WHEN the System loads, THE System SHALL display a header poster image at 300px height on desktop
2. WHEN the System renders the navigation, THE System SHALL display three tabs: "主页/Main Page", "演讲议程/Agenda", and "Amarathon组委会/Amarathon Committee"
3. WHEN a user clicks on a tab, THE System SHALL switch the active content area and apply visual styling with a gradient border
4. WHEN a tab is active, THE System SHALL display the tab title in bold with color #232F3F
5. THE System SHALL maintain a white background for the tab bar with a 1px border (#EAECF4)

### Requirement 2: Main Page Content Display

**User Story:** As a user, I want to view the main event information, so that I can understand the event details, schedule, speakers, and partners.

#### Acceptance Criteria

1. THE System SHALL display an event description section with a 1200px width container on desktop
2. WHEN the event status is "not started", THE System SHALL display registration buttons for Chinese and Global audiences
3. WHEN the event status is "live", THE System SHALL display a "Watch Live Stream" button
4. WHEN the event status is "ended", THE System SHALL display a disabled "Live Ended" button
5. THE System SHALL display a schedule section with event timeline information at 801px height
6. THE System SHALL display a speaker showcase section at 338px height
7. THE System SHALL display partner logos organized by sponsorship tiers (12小时直播联盟, 铂金赞助, 社区合作)
8. THE System SHALL apply gradient backgrounds (linear-gradient) to specific sections as per design

### Requirement 3: Agenda Section Display

**User Story:** As a user, I want to browse the event agenda with speaker sessions, so that I can plan which talks to attend.

#### Acceptance Criteria

1. THE System SHALL display agenda cards in a vertical list with 10px gaps
2. WHEN rendering an agenda item, THE System SHALL display session level badge (Level 200/300 Advanced/Intermediate)
3. THE System SHALL display session times in both UTC and Beijing timezone
4. THE System SHALL display session title in both English and Chinese
5. THE System SHALL display language indicator with purple gradient text (#2D62FF to #8837F3)
6. THE System SHALL display session summary with scrollable content limited to 200px height
7. THE System SHALL display speaker photo at 46px width
8. THE System SHALL display speaker name, country, and title
9. THE System SHALL display social media icons (Twitter/X, Facebook, Instagram, GitHub, LinkedIn, Other) when available
10. THE System SHALL apply a gradient border (linear-gradient 98deg, #2D62FF -24.99%, #BE52FF 107.17%) to each card

### Requirement 4: Committee Section Display

**User Story:** As a user, I want to view information about the organizing committee, judges, and advisers, so that I can learn about the people behind the event.

#### Acceptance Criteria

1. THE System SHALL display three sub-navigation items: "Amarathon组委会", "Amarathon 评审团", "Amarathon 顾问"
2. WHEN a sub-navigation item is clicked, THE System SHALL scroll to the corresponding section smoothly
3. THE System SHALL display committee members in a two-column grid layout with 20px gaps
4. WHEN rendering a committee card, THE System SHALL display member photo at 180px width
5. THE System SHALL display member name, position, description, and job responsibilities
6. THE System SHALL apply scrollable content areas with gradient fade effects for overflow text
7. THE System SHALL display social media icons at the bottom of each card
8. THE System SHALL apply gradient borders to cards matching the design system
9. THE System SHALL alternate background colors between sections (white and gradient backgrounds)

### Requirement 5: Responsive Design Implementation

**User Story:** As a user on different devices, I want the website to adapt to my screen size, so that I can have an optimal viewing experience.

#### Acceptance Criteria

1. WHEN viewport width is 1920px or greater, THE System SHALL apply desktop styles using vw units
2. WHEN viewport width is between 768px and 1199px, THE System SHALL apply tablet styles
3. WHEN viewport width is 767px or less, THE System SHALL apply mobile styles
4. THE System SHALL adjust font sizes proportionally using vw calculations for each breakpoint
5. THE System SHALL reflow content layouts (e.g., agenda cards stack vertically on mobile)
6. THE System SHALL adjust image sizes and spacing for each breakpoint
7. THE System SHALL hide desktop-specific elements and show mobile-specific elements when appropriate
8. THE System SHALL maintain aspect ratios for all images across breakpoints

### Requirement 6: Visual Styling and Design System

**User Story:** As a user, I want the website to have consistent and appealing visual design, so that I have a professional experience.

#### Acceptance Criteria

1. THE System SHALL use the primary gradient (linear-gradient 98deg, #2D62FF -24.99%, #BE52FF 107.17%) for accent elements
2. THE System SHALL use #232F3F for primary text color
3. THE System SHALL use #545E6B for secondary text color
4. THE System SHALL use #FFFFFF for background colors
5. THE System SHALL apply border-radius of 12px for cards and 55px for buttons
6. THE System SHALL use font-size 14px with line-height 22px for body text
7. THE System SHALL use font-size 30px with line-height 32px for section titles
8. THE System SHALL apply smooth transitions (0.25s ease) for interactive elements
9. THE System SHALL use custom scrollbar styling with #D0DFF0 thumb color
10. THE System SHALL apply gradient fade effects for scrollable content areas

### Requirement 7: Interactive Elements and User Feedback

**User Story:** As a user, I want interactive elements to provide visual feedback, so that I know my actions are registered.

#### Acceptance Criteria

1. WHEN a user hovers over a clickable element, THE System SHALL apply cursor: pointer
2. WHEN a user clicks a tab, THE System SHALL update the active state immediately
3. WHEN a user clicks a navigation item in the committee section, THE System SHALL scroll smoothly with offset adjustment
4. WHEN a user clicks external links, THE System SHALL open them in a new tab with rel="noopener noreferrer"
5. THE System SHALL apply hover effects to buttons and links
6. THE System SHALL maintain disabled state styling for inactive buttons

### Requirement 8: Data Integration and Dynamic Content

**User Story:** As a user, I want to see accurate event information loaded from data sources, so that I have up-to-date details.

#### Acceptance Criteria

1. THE System SHALL load agenda data from the agenda.js file containing 36 session objects
2. WHEN rendering agenda items, THE System SHALL map speaker photos using the pattern "photo/{id}.png"
3. THE System SHALL compute event status based on current date/time comparison
4. THE System SHALL display appropriate buttons based on event status (0: not started, 1: live, 2: ended)
5. THE System SHALL handle missing social media links gracefully by not rendering icons
6. THE System SHALL preserve line breaks in session summaries using white-space: pre-line
7. THE System SHALL load committee member data from the translations object in the component

### Requirement 9: Asset Management and External Resources

**User Story:** As a developer, I want all external resources properly managed, so that the website loads correctly.

#### Acceptance Criteria

1. THE System SHALL load all images from the @/assets/images/amarothon12/ directory
2. THE System SHALL provide separate image assets for desktop, tablet, and mobile versions where specified
3. THE System SHALL load partner logos with proper dimensions and aspect ratios
4. THE System SHALL load speaker photos numbered 1-36 for agenda items
5. THE System SHALL load committee member photos with both desktop and mobile versions
6. THE System SHALL handle missing images gracefully without breaking layout
7. THE System SHALL optimize image loading for performance

### Requirement 10: Accessibility and Standards Compliance

**User Story:** As a user with accessibility needs, I want the website to be accessible, so that I can navigate and understand the content.

#### Acceptance Criteria

1. THE System SHALL provide alt text for all images
2. THE System SHALL maintain proper heading hierarchy (h1, h2, h3)
3. THE System SHALL ensure sufficient color contrast ratios for text
4. THE System SHALL support keyboard navigation for interactive elements
5. THE System SHALL use semantic HTML elements appropriately
6. THE System SHALL provide ARIA labels where necessary for screen readers
