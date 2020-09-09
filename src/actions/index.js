import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

import routes from '../routes';

// eslint-disable-next-line import/prefer-default-export
export const addMessage = createAction('MESSAGE_ADD');
export const switchChannelSuccess = createAction('CHANNEL_SWITCH');

export const switchChannel = (id) => (dispatch) => {
  Cookies.set('currentChannelId', id);
  dispatch(switchChannelSuccess(id));
};
