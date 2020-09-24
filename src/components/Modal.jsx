import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';

import ChannelAdd from './Forms/ChannelAdd';
import ChannelDelete from './Forms/ChannelDelete';
import ChannelRename from './Forms/ChannelRename';
import { actions } from '../slices';

const forms = {
  add: ChannelAdd,
  delete: ChannelDelete,
  rename: ChannelRename,
};

const mapStateToProps = ({ modalInfo: { type, open } }) => ({ modalType: type, isOpen: open });

const actionCreators = {
  closeModal: actions.closeModal,
};

const OpenModal = (props) => {
  const { isOpen, modalType, closeModal } = props;

  if (!isOpen) {
    return null;
  }

  const Form = forms[modalType];
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
        <Form />
      </Modal.Body>
    </Modal>
  );
};

export default connect(mapStateToProps, actionCreators)(OpenModal);
