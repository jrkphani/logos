import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

// Define custom colors
const colors = {
  brand: {
    50: '#e6f0ec',
    100: '#cce2d9',
    200: '#b3d3c6',
    300: '#99c5b3',
    400: '#80b7a0',
    500: '#07422B', // Deep Green - logos-primary-main
    600: '#063b26',
    700: '#053321',
    800: '#042c1c',
    900: '#032417',
    hover: '#3D7359', // 20% lighter - accent-teal-hover
  },
  gray: {
    10: '#f4f4f4', // Carbon Gray 10 for hover states
    20: '#e0e0e0', // Carbon Gray 20 for disabled states
    50: '#8d8d8d', // Carbon Gray 50 for disabled text
    100: '#e0e0e0',
    200: '#c6c6c6',
    300: '#a8a8a8',
    400: '#8d8d8d',
    500: '#6f6f6f',
    600: '#525252',
    700: '#393939',
    800: '#262626',
    900: '#161616',
  },
  success: '#198038', // Soft Green - support-success
  warning: '#F1C21B',
  error: '#FA4D56', // Carbon Red - support-error
  info: '#005D5D',
};

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: colors.brand[50] },
          100: { value: colors.brand[100] },
          200: { value: colors.brand[200] },
          300: { value: colors.brand[300] },
          400: { value: colors.brand[400] },
          500: { value: colors.brand[500] },
          600: { value: colors.brand[600] },
          700: { value: colors.brand[700] },
          800: { value: colors.brand[800] },
          900: { value: colors.brand[900] },
          hover: { value: colors.brand.hover },
        },
        gray: {
          10: { value: colors.gray[10] },
          20: { value: colors.gray[20] },
          50: { value: colors.gray[50] },
          100: { value: colors.gray[100] },
          200: { value: colors.gray[200] },
          300: { value: colors.gray[300] },
          400: { value: colors.gray[400] },
          500: { value: colors.gray[500] },
          600: { value: colors.gray[600] },
          700: { value: colors.gray[700] },
          800: { value: colors.gray[800] },
          900: { value: colors.gray[900] },
        },
        success: { value: colors.success },
        warning: { value: colors.warning },
        error: { value: colors.error },
        info: { value: colors.info },
      },
      fonts: {
        heading: { value: '"IBM Plex Sans", sans-serif' },
        body: { value: '"IBM Plex Sans", sans-serif' },
        mono: { value: '"IBM Plex Mono", monospace' },
      },
    },
  },
  globalCss: {
    'button': {
      fontWeight: 'semibold',
      borderRadius: '0',
    },
  },
});

const theme = createSystem(defaultConfig, customConfig);

// Export for direct usage of color values in components
export { colors };
export default theme; 