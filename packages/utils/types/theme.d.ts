declare enum Theme {
    light = "light",
    dark = "dark"
}
declare function getTheme(): Theme;
declare function setTheme(theme: Theme): void;
declare const theme: {
    getTheme: typeof getTheme;
    setTheme: typeof setTheme;
    toggleTheme: () => void;
};
export default theme;
