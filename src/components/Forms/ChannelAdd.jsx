// @ts-check

import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { Form, FormGroup, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import axios from 'axios';
import { useFormik } from 'formik';

import { actions } from '../../slices';
import routes from '../../routes.js';

const actionCreators = {
  closeModal: actions.closeModal,
};

const validate = (value) => {
  if (!value) {
    return 'Channel name don\'t must be empty or consist of spaces only';
  }
  return '';
};

const ChannelAddForm = (props) => {
  const { closeModal } = props;

  const formik = useFormik({
    initialValues: { name: '' },
    onSubmit: async (values, { setErrors }) => {
      const name = values.name.trim();
      const error = validate(name);

      if (error) {
        setErrors({ name: error });
        return;
      }
      try {
        const url = routes.channelsPath();
        const data = { attributes: { name } };

        await axios.post(url, { data });
        closeModal();
      } catch (err) {
        setErrors({ name: err.message });
      }
    },
  });

  const channelNameInput = useRef();
  useEffect(() => {
    // @ts-ignore
    channelNameInput.current.focus();
  }, [formik.isSubmitting]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormGroup className="m-0">
        <FormControl
          name="name"
          className={cn({ 'is-invalid': formik.errors.name, 'is-loading': formik.isSubmitting })}
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          value={formik.values.name}
          ref={channelNameInput}
          data-testid="channel-add-input"
        />
        <Form.Control.Feedback type="invalid" className="mt-2">
          {formik.errors.name}
        </Form.Control.Feedback>
        <div className="d-flex justify-content-end mt-3">
          <Button
            className="mr-2"
            variant="secondary"
            onClick={() => closeModal()}
            disabled={formik.isSubmitting}
          >
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting && <span className="spinner-border spinner-border-sm ml-2" />}
            {formik.isSubmitting ? 'Adding...' : 'Add'}
          </Button>
        </div>
      </FormGroup>
    </form>
  );
};

export default connect(null, actionCreators)(ChannelAddForm);
