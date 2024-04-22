export type Options = {
    show: boolean;
    disabledScroll?: boolean;
    maskEl?: HTMLElement | null;
    contentEl?: HTMLElement | null;
};
export default function useDisabledScrollByMask({ show, disabledScroll, maskEl, contentEl }?: Options): void;
