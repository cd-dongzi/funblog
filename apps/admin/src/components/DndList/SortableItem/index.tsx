import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Badge } from 'antd';
import { CSSProperties } from 'react';
import { RenderItemFn } from '../types';

export default function SortableItem<T extends Record<string, any>>({
  id,
  gap,
  depth,
  childCount,
  renderItem,
  dragItem,
  onCollapse,
  data,
}: {
  id: UniqueIdentifier;
  gap: number;
  depth: number;
  childCount?: number;
  onRemove?: () => void;
  renderItem?: RenderItemFn<T>;
  dragItem?: boolean;
  onCollapse?: () => void;
  data?: T;
}) {
  const { attributes, listeners, transform, transition, setDraggableNodeRef, setDroppableNodeRef } = useSortable({
    id,
    data,
  });
  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
  };
  const dragProps = dragItem ? { ...attributes, ...listeners } : {};
  const child = (
    <div className="pl-[--spacing]" ref={setDraggableNodeRef} style={style} onClick={onCollapse} {...dragProps}>
      {renderItem?.(!dragItem ? { attributes, listeners } : {})}
    </div>
  );
  return (
    <div
      ref={setDroppableNodeRef}
      style={
        {
          '--spacing': `${gap * depth}px`,
        } as React.CSSProperties
      }
    >
      {childCount && childCount > 1 ? (
        <Badge count={childCount} color="blue">
          {child}
        </Badge>
      ) : (
        child
      )}
    </div>
  );
}
