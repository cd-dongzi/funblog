export default function useResize({ debounce, delay, callback, }: {
    debounce?: boolean;
    delay?: number;
    callback: (e?: UIEvent) => void;
}): void;
