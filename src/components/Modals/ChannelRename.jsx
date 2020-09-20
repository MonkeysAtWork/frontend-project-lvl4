// @ts-check

import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { Form, FormGroup, FormControl } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { useFormik } from 'formik';
import axios from 'axios';

import { actions } from '../../slices';
import routes from '../../routes.js';

const mapStateToProps = ({ modalInfo: { item } }) => (
  { currentChannel: item });

const actionCreators = {
  closeModal: actions.closeModal,
};

const validate = (value, oldValue) => {
  if (value === oldValue) {
    return 'The same name!';
  }
  if (!value) {
    return 'Channel name don\'t must be empty or consist of spaces only';
  }
  return '';
};

const ChannelRenameModal = (props) => {
  const { closeModal, currentChannel } = props;

  const formik = useFormik({
    initialValues: { name: currentChannel.name },
    onSubmit: async (values, { setErrors }) => {
      const name = values.name.trim();
      const error = validate(name, currentChannel.name);

      if (error) {
        setErrors({ name: error });
        return;
      }
      try {
        const url = routes.channelPath(currentChannel.id);
        const attributes = { ...currentChannel, name };

        await axios.patch(url, { data: { attributes } });
        closeModal();
      } catch (err) {
        setErrors({ name: err.message });
      }
    },
  });

  const channelNameInput = useRef();
  useEffect(() => {
    // @ts-ignore
    channelNameInput.current.select();
  }, [formik.isSubmitting]);

  return (
    <Modal
      show
      onHide={() => closeModal()}
      backdrop={!formik.isSubmitting}
      keyboard={!formik.isSubmitting}
    >
      <Modal.Header closeButton>
        <Modal.Title>Rename Channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup className="m-0">
            <FormControl
              name="name"
              className={cn({ 'is-invalid': formik.errors.name, 'is-loading': formik.isSubmitting })}
              disabled={formik.isSubmitting}
              onChange={formik.handleChange}
              value={formik.values.name}
              ref={channelNameInput}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </FormGroup>
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
          variant="primary"
          onClick={() => formik.handleSubmit()}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting && <span className="spinner-border spinner-border-sm ml-2" />}
          {formik.isSubmitting ? 'Renaming...' : 'Rename'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default connect(mapStateToProps, actionCreators)(ChannelRenameModal);
