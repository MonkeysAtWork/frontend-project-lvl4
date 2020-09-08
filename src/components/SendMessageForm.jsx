import React, { useEffect } from 'react';
import cn from 'classnames';
import axios from 'axios';
import { useFormik } from 'formik';

import routes from '../routes.js';
import UserContext from './UserContext';

const SendMessageForm = (props) => {
  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: async (values, actions) => {
      try {
        const channelId = 1;
        const url = routes.channelMessagesPath(channelId);
        const { nickName } = props;
        const data = { attributes: { body: values.body, nickName } };
        await axios.post(url, { data });
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

export default () => (
  <UserContext.Consumer>
    {(value) => <SendMessageForm nickName={value} />}
  </UserContext.Consumer>
);
