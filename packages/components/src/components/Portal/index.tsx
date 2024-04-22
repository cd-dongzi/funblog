import { canUseDom } from '@funblog/utils';
import { useRef } from 'react';
import ReactDom from 'react-dom';

type Props = {
  children: any;
  container?: any;
};
interface PortalProps {
  (props: Props): JSX.Element | null;
}

const Portal: PortalProps = ({ children, container }) => {
  const containerRef = useRef<HTMLElement>();
  if (canUseDom()) {
    if (!container) {
      containerRef.current = document.body;
    } else {
      containerRef.current = container;
    }
  }
  return containerRef.current ? ReactDom.createPortal(children, containerRef.current) : null;
};

export default Portal;
