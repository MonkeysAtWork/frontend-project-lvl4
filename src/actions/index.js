import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

import routes from '../routes';

// eslint-disable-next-line import/prefer-default-export
export const addMessage = createAction('MESSAGE_ADD');
export const switchChannelSuccess = createAction('CHANNEL_SWITCH');

export const switchChannel = (id) => async (dispatch) => {
  // switchChannelRequest
  try {
    const url = routes.channelMessagesPath(id);
    const { data: { data } } = await axios.get(url);
    // console.log(data);
    Cookies.set('currentChannelId', id);
    dispatch(switchChannelSuccess({ id, data }));
  } catch (err) {
    throw new Error(err);
  }
};
