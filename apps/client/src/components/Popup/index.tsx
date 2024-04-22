import { Portal } from '@funblog/components';
import React from 'react';
import Main, { PopupProps as Props } from './Main';
export type PopupProps = Props;
function Popup(props: PopupProps) {
  if (props.appendBody) {
    return (
      <Portal>
        <Main {...props} />
      </Portal>
    );
  }
  return <Main {...props} />;
}

export default Popup;
