import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/proComponents/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    spacing: {
      ...defaultTheme.spacing,
      headerH: defaultTheme.spacing[14],
      paddingPage: 'var(--padding-page)',
    },
    zIndex: {
      ...defaultTheme.zIndex,
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      l1: '9',
      l2: '10',
      l3: '99',
      l4: '100',
      l5: '999',
      l6: '1000',
    },
    // fontFamily: {
    //   play: ['Play', ...defaultTheme.fontFamily.sans],
    //   pmzd: ['PangMenZhengDaoBiaoTiTi', ...defaultTheme.fontFamily.sans],
    // },
    screens: {
      xxs: { max: '576px' },
      xs: '576px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1536px',
      xxxl: '1680px',
      pc: '768px',
      mobile: {
        max: '768px',
      },
    },
    colors: {
      // 计算颜色
      primary: 'rgb(var(--color-primary), <alpha-value>)',
      secondary: 'rgb(var(--color-secondary), <alpha-value>)',
      gray: 'rgb(var(--color-gray), <alpha-value>)',
      white: 'rgb(var(--color-white), <alpha-value>)',
      black: 'rgb(var(--color-black), <alpha-value>)',
      red: 'rgb(var(--color-red), <alpha-value>)',
      green: 'rgb(var(--color-green), <alpha-value>)',

      'primary-light-1': 'var(--color-primary-light-1)',
      'primary-dark-1': 'var(--color-primary-dark-1)',
      'primary-dark-2': 'var(--color-primary-dark-2)',
      'secondary-dark-1': 'var(--color-secondary-dark-1)',
      'secondary-light-1': 'var(--color-secondary-light-1)',
      'secondary-light-2': 'var(--color-secondary-light-2)',

      // 标题
      title: 'var(--color-title)',
      // 副标题
      subTitle: 'var(--color-subTitle)',
      // 正文
      text: 'var(--color-text)',
      // 副文
      // 背景
      bg: 'var(--color-bg)',
      gray1: 'var(--color-gray-1)',
      gray2: 'var(--color-gray-2)',
      gray3: 'var(--color-gray-3)',
      gray4: 'rgb(var(--color-gray-4), <alpha-value>)',
      gray5: 'var(--color-gray-5)',
      gray6: 'var(--color-gray-6)',
      gray7: 'var(--color-gray-7)',
      gray8: 'var(--color-gray-8)',
      gray9: 'var(--color-gray-9)',
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'translate-z': (value) => ({
            '--tw-translate-z': value,
            transform:
              ' translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))',
          }), // this is actual CSS
        },
        { values: theme('translate'), supportsNegativeValues: true },
      );
    }),
  ],
};
export default config;
