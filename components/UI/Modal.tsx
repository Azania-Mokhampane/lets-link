import React, { FC, ReactNode, useState } from "react";
import {
  Button,
  Checkbox,
  Input,
  Modal as NextModal,
  Row,
  Text,
} from "@nextui-org/react";

interface IModalProps {
  children: ReactNode;
  onOpen: boolean;
  onClose: () => void;
  modalTitle?: string;
}
const Modal: FC<IModalProps> = ({ onClose, onOpen, children, modalTitle }) => {
  const closeHandler = () => {
    onClose();
  };
  return (
    <>
      <NextModal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={onOpen}
        onClose={closeHandler}
        animated
      >
        {modalTitle?.length && (
          <NextModal.Header>
            <Text id="modal-title" b size={18}>
              {modalTitle}
            </Text>
          </NextModal.Header>
        )}
        <NextModal.Body style={{ marginBottom: 30 }}>{children}</NextModal.Body>
      </NextModal>
    </>
  );
};

export default Modal;
