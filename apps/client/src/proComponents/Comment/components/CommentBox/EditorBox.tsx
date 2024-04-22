import { Portal } from '@funblog/components';
import React from 'react';
import Actions, { EditorActionsProps } from './Actions';
import Editor, { EditorRef } from './Editor';

export type { EditorRef };

interface EditorBoxProps extends EditorActionsProps {
  container?: HTMLDivElement;
}

const EditorBox = React.forwardRef<EditorRef, EditorBoxProps>(({ container, onSubmit, onFocus, onCancel }, ref) => {
  const child = (
    <>
      <Editor ref={ref} />
      <Actions onFocus={onFocus} onSubmit={onSubmit} onCancel={onCancel} hasCancel={!!container} />
    </>
  );
  if (!container) {
    return child;
  }
  return <Portal container={container}>{child}</Portal>;
});
EditorBox.displayName = 'EditorBox';

export default EditorBox;
