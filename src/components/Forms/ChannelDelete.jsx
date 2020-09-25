// @ts-check

import React from 'react';
import { connect } from 'react-redux';

import { Form, FormGroup } from 'react-bootstrap';

import { useFormik } from 'formik';
import axios from 'axios';

import { actions } from '../../slices';
import routes from '../../routes.js';
import Footer from './FormFooter';

const mapStateToProps = ({ modalInfo: { item }, currentChannelId }) => ({
  activeChannelId: currentChannelId,
  currentChannel: item,
});

const actionCreators = {
  closeModal: actions.closeModal,
  switchChannel: actions.switchChannel,
};

const ChannelDeleteForm = (props) => {
  const {
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
          const defaultChannelId = 1;
          switchChannel(defaultChannelId);
        }
        closeModal();
      } catch (err) {
        setErrors({ name: err.message });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormGroup className="m-0">
        <div className="is-invalid">
          <p className="m-0">
            {`Are you sure you want to delete ${currentChannel.name}?`}
          </p>
        </div>
        <Form.Control.Feedback type="invalid">
          {formik.errors.name}
        </Form.Control.Feedback>
        <Footer
          isDisabled={formik.isSubmitting}
          submitName="Delete"
          submitVariant="danger"
        />
      </FormGroup>
    </form>
  );
};

export default connect(mapStateToProps, actionCreators)(ChannelDeleteForm);
