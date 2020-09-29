import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';

import ChannelForm from './ChannelForm';
import { actions } from '../slices';

const mapStateToProps = ({ modalInfo: { type, open } }) => ({ modalType: type, isOpen: open });

const actionCreators = {
  closeModal: actions.closeModal,
};

const OpenModal = (props) => {
  const { isOpen, modalType, closeModal } = props;

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

export default connect(mapStateToProps, actionCreators)(OpenModal);
