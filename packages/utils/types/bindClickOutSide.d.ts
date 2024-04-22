export default function bindClickOutSide<T extends Event = Event>(target: Element | (() => Element | null), callback: (event: T) => void): () => void;
