import React, { useImperativeHandle, useRef } from 'react';
import { useCommentStore } from '../../store';
import { EditorProps } from '../../types';

export interface EditorRef {
  onFocus: () => void;
  onClear: () => void;
}

const Editor = React.forwardRef<EditorRef, EditorProps>((props, editorRef) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const { value, onChange, placeholder } = useCommentStore();
  useImperativeHandle(editorRef, () => ({
    onFocus: () => {
      ref.current?.focus();
    },
    onClear: () => {
      onChange('');
    },
  }));
  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={5}
      className="transition-all-5 w-full rounded bg-gray8 px-3 py-1.5 ease-in-out [border:1px_solid_transparent] [resize:none] focus:bg-white focus:[border:1px_solid_theme(colors.primary)]"
      placeholder={placeholder || '同道中人，理性留言...'}
    />
  );
});
Editor.displayName = 'Editor';

export default Editor;
