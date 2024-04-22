export default function useOutsideClick<T extends Event = Event>(target: Element | (() => Element | null), callback: (event: T) => void): void;
