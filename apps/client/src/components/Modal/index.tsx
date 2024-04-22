import React, { useState } from 'react';
import { mountElement } from '@/utils/mountElement';
import IModal, { IIModal, ModalProps } from './Main';

type Props = Omit<ModalProps, 'isOpen'>;
interface ModalType extends IIModal {
  openModal: (props: Props) => void;
}
const Modal = IModal as ModalType;

const { data, mount, unmount } = mountElement();
const Container = (props: Props) => {
  const [show, setShow] = useState(true);
  const onClose = () => {
    setShow(false);
    unmount();
  };
  return <IModal isOpen={show} {...props} onClose={onClose} />;
};

Modal.openModal = (props: Props) => {
  mount();
  data.root?.render(<Container {...props} />);
};

export default Modal;
