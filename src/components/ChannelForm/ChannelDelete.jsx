// @ts-check

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Form, FormGroup } from 'react-bootstrap';

import { useFormik } from 'formik';
import axios from 'axios';

import { actions } from '../../slices';
import routes from '../../routes.js';
import Footer from './FormFooter';

const ChannelDeleteForm = () => {
  // @ts-ignore
  const currentChannel = useSelector((state) => state.modalInfo.item);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { name: currentChannel.name },
    onSubmit: async (values, { setErrors }) => {
      try {
        const url = routes.channelPath(currentChannel.id);

        await axios.delete(url);
        dispatch(actions.closeModal());
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

export default ChannelDeleteForm;
