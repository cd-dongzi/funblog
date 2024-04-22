import cacheSession from './cacheSession';

const THEME_KEY = 'FUN_BLOG_THEME';
enum Theme {
  light = 'light',
  dark = 'dark',
}
function getTheme() {
  const htmlTheme = document.documentElement.getAttribute('data-theme');
  const cacheTheme = cacheSession.get(THEME_KEY);
  const systemTheme = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? Theme.dark : Theme.light;
  const theme = (htmlTheme || cacheTheme || systemTheme) as Theme;
  return theme;
}
function setTheme(theme: Theme) {
  cacheSession.set(THEME_KEY, theme);
  document.documentElement.setAttribute('data-theme', theme);
}
const toggleTheme = () => {
  const theme = getTheme();
  if (theme === Theme.light) {
    setTheme(Theme.dark);
  } else {
    setTheme(Theme.light);
  }
};

const theme = { getTheme, setTheme, toggleTheme };
export default theme;
