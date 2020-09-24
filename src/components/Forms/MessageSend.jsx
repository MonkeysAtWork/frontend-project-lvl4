// @ts-check

import React, { useEffect, useRef, useContext } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { Form, FormGroup, FormControl } from 'react-bootstrap';

import axios from 'axios';
import { useFormik } from 'formik';

import routes from '../../routes.js';
import UserContext from '../../UserContext';

const mapStateToProps = ({ currentChannelId, modalInfo }) => ({ currentChannelId, modalInfo });

const MessageSendForm = (props) => {
  const { currentChannelId, modalInfo } = props;
  const nickname = useContext(UserContext);

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: async (values, { resetForm, setErrors }) => {
      try {
        const url = routes.channelMessagesPath(currentChannelId);
        const attributes = { body: values.body, nickname, channelId: currentChannelId };
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
    <form onSubmit={formik.handleSubmit} data-testid="message-send-form">
      <FormGroup>
        <FormControl
          name="body"
          className={cn({ 'is-invalid': formik.errors.body, 'is-loading': formik.isSubmitting })}
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          value={formik.values.body}
          ref={messageInput}
          data-testid="message-send-input"
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

export default connect(mapStateToProps)(MessageSendForm);
