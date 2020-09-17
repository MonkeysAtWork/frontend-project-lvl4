// @ts-check

import React from 'react';
import { connect } from 'react-redux';

import { Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { useFormik } from 'formik';
import axios from 'axios';

import * as actions from '../../actions';
import routes from '../../routes.js';

const mapStateToProps = ({ modalInfo: { item, modalState }, currentChannelId }) => ({
  activeChannelId: currentChannelId,
  currentChannel: item,
  modalState,
});

const actionCreators = {
  closeModal: actions.closeModal,
  switchChannel: actions.switchChannel,
};

const ChannelDeleteModal = (props) => {
  const {
    modalState,
    closeModal,
    switchChannel,
    currentChannel,
    activeChannelId,
  } = props;

  const formik = useFormik({
    initialValues: { name: currentChannel.name },
    onSubmit: async (values, { setErrors }) => {
      try {
        const url = routes.channelPath(currentChannel.id);
        await axios.delete(url);
        if (currentChannel.id === activeChannelId) {
          switchChannel(1);
        }
        closeModal();
      } catch (err) {
        setErrors({ name: err.message });
      }
    },
  });

  return (
    <Modal
      show={modalState === 'Delete'}
      onHide={() => closeModal()}
      backdrop={!formik.isSubmitting}
      keyboard={!formik.isSubmitting}
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete Channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="is-invalid">
            <p className="m-0">
              {`Are you sure you want to delete ${currentChannel.name}?`}
            </p>
          </div>
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => closeModal()}
          disabled={formik.isSubmitting}
        >
          Close
        </Button>
        <Button
          variant="danger"
          onClick={() => formik.handleSubmit()}
          disabled={formik.isSubmitting}
          tabIndex={0}
        >
          {formik.isSubmitting && <span className="spinner-border spinner-border-sm ml-2" />}
          {formik.isSubmitting ? 'Deleting...' : 'Delete'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default connect(mapStateToProps, actionCreators)(ChannelDeleteModal);
