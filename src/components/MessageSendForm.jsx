// @ts-check

import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { Form, FormGroup, FormControl } from 'react-bootstrap';

import axios from 'axios';
import { useFormik } from 'formik';

import routes from '../routes.js';
import UserContext from './UserContext';

const mapStateToProps = ({ currentChannelId, modalInfo }) => ({ currentChannelId, modalInfo });

const MessageSendForm = (props) => {
  const { currentChannelId, modalInfo, nickName } = props;
  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: async (values, { resetForm, setErrors }) => {
      try {
        const url = routes.channelMessagesPath(currentChannelId);
        const attributes = { body: values.body, nickName, channelId: currentChannelId };
        await axios.post(url, { data: { attributes } });
        resetForm();
      } catch (err) {
        setErrors({ body: err.message });
      }
    },
  });

  const messageInput = useRef();
  useEffect(() => {
    if (modalInfo.type === 'none') {
      // @ts-ignore
      messageInput.current.focus();
    }
  }, [modalInfo, currentChannelId, formik.isSubmitting]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormGroup>
        <FormControl
          name="body"
          className={cn({ 'is-invalid': formik.errors.body, 'is-loading': formik.isSubmitting })}
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          value={formik.values.body}
          ref={messageInput}
        />
        {formik.isSubmitting && <span className="spinner-border spinner-border-sm [readonly]" />}
        <Form.Control.Feedback
          className="d-block"
          type="invalid"
        >
          {formik.errors.body}
          &nbsp;
        </Form.Control.Feedback>
      </FormGroup>
    </form>
  );
};

const ConnectedForm = connect(mapStateToProps)(MessageSendForm);

export default () => (
  <UserContext.Consumer>
    {(value) => <ConnectedForm nickName={value} />}
  </UserContext.Consumer>
);
