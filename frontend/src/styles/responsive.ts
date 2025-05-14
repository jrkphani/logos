// Carbon-inspired responsive breakpoints and utilities

export const breakpoints = {
  sm: '320px',   // Small - Mobile
  md: '672px',   // Medium - Tablet
  lg: '1056px',  // Large - Desktop
  xlg: '1312px', // X-Large - Large Desktop
  max: '1584px', // Max - Extra Large Desktop
};

// Spacing scale matching Carbon Design System
export const spacing = {
  '01': '0.125rem', // 2px
  '02': '0.25rem',  // 4px
  '03': '0.5rem',   // 8px
  '04': '0.75rem',  // 12px
  '05': '1rem',     // 16px
  '06': '1.5rem',   // 24px
  '07': '2rem',     // 32px
  '08': '2.5rem',   // 40px
  '09': '3rem',     // 48px
  '10': '4rem',     // 64px
};

// Grid system configuration - 2x Grid from Carbon
export const grid = {
  baseUnit: '8px',
  columns: 16,
  gutters: {
    sm: '16px',
    md: '16px',
    lg: '32px',
  },
  containerWidths: {
    sm: '100%',
    md: '100%',
    lg: '1584px', // Max container width
  },
  sidebarWidths: {
    sm: 'fullwidth', // Mobile uses full-width overlay
    md: '240px',     // Tablet uses collapsible sidebar
    lg: '256px',     // Desktop uses persistent sidebar
  },
  copilotWidths: {
    sm: 'fullwidth', // Mobile uses bottom sheet
    md: '320px',     // Tablet
    lg: '384px',     // Desktop
  },
};

// Media query helper functions
export const mediaQueries = {
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xlg: `@media (min-width: ${breakpoints.xlg})`,
  max: `@media (min-width: ${breakpoints.max})`,
};

// Touch target minimums
export const touchTargets = {
  mobile: '44px',
  desktop: '32px',
  spacing: '8px',
};

// Typography scaling - base 16px with responsive scaling
export const typography = {
  baseFontSize: '16px',
  headings: {
    h1: {
      sm: '2rem',      // 32px on mobile
      md: '2.25rem',   // 36px on tablet
      lg: '2.625rem',  // 42px on desktop
      lineHeight: 1.25,
    },
    h2: {
      sm: '1.75rem',   // 28px on mobile
      md: '2rem',      // 32px on tablet
      lg: '2.25rem',   // 36px on desktop
      lineHeight: 1.3,
    },
    h3: {
      sm: '1.5rem',    // 24px on mobile
      md: '1.75rem',   // 28px on tablet
      lg: '2rem',      // 32px on desktop
      lineHeight: 1.4,
    },
    h4: {
      sm: '1.25rem',   // 20px on mobile
      md: '1.5rem',    // 24px on tablet
      lg: '1.75rem',   // 28px on desktop
      lineHeight: 1.4,
    },
  },
  body: {
    regular: {
      fontSize: '1rem',      // 16px
      lineHeight: 1.5,
    },
    small: {
      fontSize: '0.875rem',  // 14px
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.75rem',   // 12px
      lineHeight: 1.5,
    },
  },
  optimalLineLength: '960px', // 60-80 characters
}; 