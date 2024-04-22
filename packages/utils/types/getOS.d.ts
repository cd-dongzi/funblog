export default function getOS(ua: string): {
    isChrome: boolean;
    isFireFox: boolean;
    isTablet: boolean;
    isPhone: boolean;
    isAndroid: boolean;
    isPc: boolean;
};
