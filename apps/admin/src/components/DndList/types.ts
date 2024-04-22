import type { DraggableAttributes, UniqueIdentifier } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import type { MutableRefObject } from 'react';

export interface TreeItem<T = Record<string, any>> {
  id: UniqueIdentifier;
  children: TreeItem<T>[];
  data?: T;
  collapsed?: boolean;
}

export type TreeItems = TreeItem[];

export interface FlattenedItem<T = Record<string, any>> extends TreeItem<T> {
  parentId: UniqueIdentifier | null;
  depth: number;
  index: number;
}

export type RenderItemData<T> = Partial<
  FlattenedItem<T> & {
    attributes: DraggableAttributes;
    listeners?: SyntheticListenerMap;
  }
>;
export type RenderItemFn<T = Record<string, any>> = (data: RenderItemData<T>, index?: number) => JSX.Element;

export type SensorContext = MutableRefObject<{
  items: FlattenedItem[];
  offset: number;
}>;
