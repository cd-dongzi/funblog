import React from 'react';
import { Root, createRoot } from 'react-dom/client';
import Main from './Main';

interface PreviewImgOption {
  src: string;
  alt?: string;
}

let container: Element | null = null;
let root: Root | null = null;
const hide = () => {
  if (container) {
    root?.unmount();
    container.parentNode?.removeChild(container);
    container = null;
    root = null;
  }
};

const show = ({ src, alt }: PreviewImgOption) => {
  if (container && root) {
    return;
  }
  container = document.createElement('span');
  document.body.appendChild(container);
  root = createRoot(container);
  root.render(<Main src={src} alt={alt} onClose={hide} />);
};

const PreviewImage = {
  show,
  hide,
};
export default PreviewImage;
