export interface ScrollProps {
    debounce?: boolean;
    delay?: number;
    callback: (e?: Event) => void;
    getContainer?: () => HTMLElement | null | undefined;
}
export default function useScroll({ debounce, delay, callback, getContainer }: ScrollProps): void;
