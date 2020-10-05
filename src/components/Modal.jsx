import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';

import ChannelForm from './ChannelForm';
import { actions } from '../slices';

const OpenModal = () => {
  const isOpen = useSelector((state) => state.modalInfo.open);
  const modalType = useSelector((state) => state.modalInfo.type);

  const dispatch = useDispatch();
  const closeModal = () => dispatch(actions.closeModal());

  if (!isOpen) {
    return null;
  }

  const modalName = modalType[0].toUpperCase() + modalType.substring(1);

  return (
    <Modal
      show
      onHide={() => closeModal()}
    >
      <Modal.Header closeButton>
        <Modal.Title>{`${modalName} channel`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ChannelForm />
      </Modal.Body>
    </Modal>
  );
};

export default OpenModal;
