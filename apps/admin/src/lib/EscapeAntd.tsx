'use client';
import { message as antdMessage, notification as antdNotification, Modal as antdModal, App } from 'antd';

import type { MessageInstance } from 'antd/es/message/interface';
import type { ModalStaticFunctions } from 'antd/es/modal/confirm';
import type { NotificationInstance } from 'antd/es/notification/interface';

let message: MessageInstance = antdMessage;
let notification: NotificationInstance = antdNotification;
let modal: Omit<ModalStaticFunctions, 'warn'> = antdModal;

/**
 * This component is used to escape the antd's static functions.
 */
function EscapeAntd() {
  const staticFunctions = App.useApp();
  message = staticFunctions.message;
  notification = staticFunctions.notification;
  modal = staticFunctions.modal;

  return null;
}

export { message, notification, modal };

export default EscapeAntd;
