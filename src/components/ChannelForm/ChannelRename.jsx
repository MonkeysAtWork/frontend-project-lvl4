// @ts-check

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { Form, FormGroup, FormControl } from 'react-bootstrap';

import { useFormik } from 'formik';
import axios from 'axios';

import { actions } from '../../slices';
import routes from '../../routes.js';
import Footer from './FormFooter';

const validate = (value, oldValue) => {
  if (value === oldValue) {
    return 'The same name!';
  }
  if (!value) {
    return 'Channel name don\'t must be empty or consist of spaces only';
  }
  return '';
};

const ChannelRenameForm = () => {
  // @ts-ignore
  const currentChannel = useSelector((state) => state.modalInfo.item);

  const dispatch = useDispatch();

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
        dispatch(actions.closeModal());
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
    <form onSubmit={formik.handleSubmit}>
      <FormGroup className="m-0">
        <FormControl
          name="name"
          className={cn({ 'is-invalid': formik.errors.name })}
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          value={formik.values.name}
          ref={channelNameInput}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.name}
        </Form.Control.Feedback>
        <Footer
          isDisabled={formik.isSubmitting}
          submitName="Rename"
        />
      </FormGroup>
    </form>
  );
};

export default ChannelRenameForm;
