import { Root, createRoot } from 'react-dom/client';

export function mountElement() {
  const data = {
    container: null as Element | null,
    root: null as Root | null,
  };

  const unmount = () => {
    if (data.container) {
      data.root?.unmount();
      data.container.parentNode?.removeChild(data.container);
      data.container = null;
      data.root = null;
    }
  };

  const mount = () => {
    if (data.container && data.root) {
      return;
    }
    data.container = document.createElement('span');
    document.body.appendChild(data.container);
    data.root = createRoot(data.container);
  };

  return {
    data,
    unmount,
    mount,
  };
}
