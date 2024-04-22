import { RefObject } from 'react';
export default function useSize<T extends Element>(ref: RefObject<T>): {
    width: number;
    height: number;
};
