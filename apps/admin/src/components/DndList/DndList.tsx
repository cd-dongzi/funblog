import { DndContext, UniqueIdentifier, DragOverlay, Modifier, useSensors, useSensor } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { useMount } from '@funblog/hooks';
import { useMemo, useState, useImperativeHandle, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { dropAnimationConfig } from './config';
import { MouseSensor } from './sensor';
import SortableItem from './SortableItem';
import { TreeItem, FlattenedItem, RenderItemFn, RenderItemData } from './types';
import {
  flattenTree,
  removeChildrenOf,
  getProjection,
  buildTree,
  getChildCount,
  removeItem,
  setProperty,
} from './utils';

const adjustTranslate: Modifier = ({ transform }) => {
  return {
    ...transform,
    y: transform.y - 25,
  };
};

export interface DndListRef<T = Record<string, any>> {
  onRemove: (id?: UniqueIdentifier) => void;
  getFlattenedItems: () => FlattenedItem<T>[];
}
export interface DndListProps<T> {
  value?: TreeItem<T>[];
  onChange?: (value: TreeItem<T>[]) => void;
  onFlattenedChange?: (value: FlattenedItem<T>[]) => void;
  gap?: number;
  indicator?: boolean;
  renderItem?: RenderItemFn<T>;
  dragItem?: boolean;
  collapsible?: boolean;
  dndRef?: React.MutableRefObject<DndListRef<T> | undefined>;
}
function DndList<T extends Record<string, any>>({
  gap = 0,
  indicator = false,
  value = [],
  onChange,
  onFlattenedChange,
  renderItem,
  dragItem,
  collapsible,
  dndRef,
}: DndListProps<T>) {
  const dataRef = useRef({
    onFlattenedChange,
  });
  dataRef.current.onFlattenedChange = onFlattenedChange;

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [overId, setOverId] = useState<UniqueIdentifier | null>(null);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const mount = useMount(true);

  const flattenedItems = useMemo(() => {
    const flattenedTree = flattenTree(value);
    const collapsedItems = flattenedTree.reduce<string[]>(
      (acc, { children, collapsed, id }) => (collapsed && children.length ? [...acc, id as string] : acc),
      [],
    );

    return removeChildrenOf(flattenedTree, activeId ? [activeId, ...collapsedItems] : collapsedItems);
  }, [activeId, value]);

  useEffect(() => {
    dataRef.current.onFlattenedChange?.(flattenedItems);
  }, [flattenedItems]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const resetState = () => {
    setOverId(null);
    setActiveId(null);
    setOffsetLeft(0);
    document.body.style.setProperty('cursor', '');
  };

  function handleRemove(id: UniqueIdentifier) {
    const newItems = removeItem(value, id);
    onChange?.(newItems);
  }

  function handleCollapse(id: UniqueIdentifier) {
    const newItems = setProperty(value, id, 'collapsed', (value) => {
      return !value;
    }) as TreeItem<T>[];
    onChange?.(newItems);
  }

  useImperativeHandle(dndRef, () => ({
    onRemove(id?: UniqueIdentifier) {
      id && handleRemove(id);
    },
    getFlattenedItems() {
      return flattenedItems;
    },
  }));

  const activeItem = activeId ? flattenedItems.find(({ id }) => id === activeId) : null;

  const sortedIds = useMemo(() => flattenedItems.map(({ id }) => id), [flattenedItems]);

  const projected = activeId && overId ? getProjection(flattenedItems, activeId, overId, offsetLeft, gap) : null;
  const renderItemFn = (item: FlattenedItem<T>, index?: number) =>
    renderItem ? (data: RenderItemData<T>) => renderItem({ ...item, ...data }, index) : undefined;
  if (!mount) return null;
  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        setActiveId(active.id);
        setOverId(active.id);
        document.body.style.setProperty('cursor', 'grabbing');
      }}
      onDragMove={({ delta }) => {
        setOffsetLeft(delta.x);
      }}
      onDragOver={({ over }) => {
        setOverId(over?.id ?? null);
      }}
      onDragEnd={({ over, active }) => {
        resetState();
        if (projected && over) {
          const { depth, parentId } = projected;
          const clonedItems: FlattenedItem[] = JSON.parse(JSON.stringify(flattenTree(value)));
          const overIndex = clonedItems.findIndex(({ id }) => id === over.id);
          const activeIndex = clonedItems.findIndex(({ id }) => id === active.id);
          const activeTreeItem = clonedItems[activeIndex];

          clonedItems[activeIndex] = { ...activeTreeItem, depth, parentId };

          const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);
          const newItems = buildTree(sortedItems) as TreeItem<T>[];
          onChange?.(newItems);
        }
      }}
      onDragCancel={resetState}
    >
      <SortableContext items={sortedIds}>
        {flattenedItems.map((item, index) => {
          const { id, depth, children } = item;
          return (
            <SortableItem
              id={id}
              key={id}
              dragItem={dragItem}
              gap={gap}
              data={item.data as T}
              depth={id === activeId && projected ? projected.depth : depth}
              onRemove={() => handleRemove(id)}
              renderItem={renderItemFn(item as FlattenedItem<T>, index)}
              onCollapse={collapsible && children.length ? () => handleCollapse(id) : undefined}
            />
          );
        })}
      </SortableContext>

      {createPortal(
        <DragOverlay dropAnimation={dropAnimationConfig} modifiers={indicator ? [adjustTranslate] : undefined}>
          {activeId && activeItem ? (
            <SortableItem
              id={activeId}
              depth={activeItem.depth}
              // clone
              childCount={getChildCount(value, activeId) + 1}
              gap={gap}
              renderItem={renderItemFn(activeItem as FlattenedItem<T>)}
            />
          ) : null}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
}

export default DndList;
