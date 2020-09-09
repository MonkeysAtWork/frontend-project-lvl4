import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import axios from 'axios';
import { useFormik } from 'formik';

import routes from '../routes.js';
import UserContext from './UserContext';

const Form = (props) => {
  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: async (values, actions) => {
      try {
        const { currentChannelId } = props;
        const url = routes.channelMessagesPath(currentChannelId);
        const { nickName } = props;
        const attributes = { body: values.body, nickName, channelId: currentChannelId };
        await axios.post(url, { data: { attributes } });
        actions.resetForm();
      } catch (err) {
        actions.setErrors({ body: err.message });
      }
    },
  });

  useEffect(() => {
    const messageInput = document.getElementById('message-input');
    messageInput.focus();
  });

  return (
    <form
      noValidate
      onSubmit={formik.handleSubmit}
    >
      <div className="form-group">
        <input
          name="body"
          id="message-input"
          className={cn('form-control', { 'is-invalid': formik.errors.body, 'is-loading': formik.isSubmitting })}
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          value={formik.values.body}
        />
        {formik.isSubmitting && <span className="spinner-border spinner-border-sm [readonly]" />}
        <div className="d-block invalid-feedback">
          {formik.errors.body}
          &nbsp;
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = ({ currentChannelId }) => ({ currentChannelId });

const SendMessageForm = (props) => (
  <UserContext.Consumer>
    {(value) => <Form nickName={value} currentChannelId={props.currentChannelId} />}
  </UserContext.Consumer>
);

export default connect(mapStateToProps)(SendMessageForm);
