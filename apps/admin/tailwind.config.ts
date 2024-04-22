import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    screens: {
      xs: { max: '576px' },
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1600px',
    },
    colors: {
      primary: 'rgb(var(--color-primary), <alpha-value>)',
      secondary: 'rgb(var(--color-secondary), <alpha-value>)',
      gray: 'rgb(var(--color-gray), <alpha-value>)',
      white: 'rgb(var(--color-white), <alpha-value>)',
      black: 'rgb(var(--color-black), <alpha-value>)',
      red: 'rgb(var(--color-red), <alpha-value>)',
      green: 'rgb(var(--color-green), <alpha-value>)',
      // 标题
      title: 'var(--color-title)',
      // 副标题
      subTitle: 'var(--color-subTitle)',
      // 正文
      text: 'var(--color-text)',
      divider: 'var(--color-divider)',
      border: 'var(--color-border)',

      gray0: 'var(--color-gray-0)',
      gray1: 'var(--color-gray-1)',
      gray2: 'var(--color-gray-2)',
      gray3: 'var(--color-gray-3)',
      gray4: 'var(--color-gray-4)',
      gray5: 'var(--color-gray-5)',
      gray6: 'var(--color-gray-6)',
      gray7: 'var(--color-gray-7)',
      gray8: 'var(--color-gray-8)',
      gray9: 'var(--color-gray-9)',
    },
  },
  plugins: [],
};
export default config;
