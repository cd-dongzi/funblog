import { Icon } from '@funblog/components';
import cls from 'classnames';
import { useState } from 'react';
import Emoji from '../Emoji';

export interface EditorActionsProps {
  onFocus: () => void;
  onSubmit: () => void;
  onCancel: () => void;
  hasCancel?: boolean;
}

function Actions({ onFocus, onSubmit, onCancel, hasCancel }: EditorActionsProps) {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      await onSubmit();
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-2.5 flex justify-between">
      <div>
        <Emoji onFocus={onFocus}>
          {({ onShow }) => (
            <Icon
              name="emoji"
              className="transition-all-3 cursor-pointer text-lg [outline:none] hover:scale-110 hover:text-primary"
              onClick={onShow}
            />
          )}
        </Emoji>
      </div>
      <div className="flex items-center justify-center">
        {hasCancel && (
          <button className="btn-clear transition-all-3 mr-2.5 text-gray4 hover:text-primary" onClick={onCancel}>
            取消回复
          </button>
        )}
        <button
          className={cls(
            'background-to-primary-light btn-clear flex items-center rounded-md px-2.5 py-1.5 text-white [transition:box-shadow_0.5s]',
            {
              'pointer-events-none opacity-50': loading,
            },
          )}
          onClick={handleSubmit}
        >
          <Icon
            name={loading ? 'loading' : 'send'}
            className={cls({
              'animate-spin': loading,
            })}
          />
          <span className="ml-2">{loading ? '发布中' : '发布评论'}</span>
        </button>
      </div>
    </div>
  );
}

export default Actions;
