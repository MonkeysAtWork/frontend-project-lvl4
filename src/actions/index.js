import { createAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export const openModal = createAction('MODAL_OPEN');
export const closeModal = createAction('MODAL_CLOSE');

export const newMessage = createAction('MESSAGE_ADD');

export const newChannel = createAction('CHANNEL_ADD');
export const removeChannel = createAction('CHANNEL_REMOVE');
export const renameChannel = createAction('CHANNEL_RENAME');
export const handleSwitchChannel = createAction('CHANNEL_SWITCH');
export const switchChannel = (id) => (dispatch) => {
  Cookies.set('currentChannelId', id);
  dispatch(handleSwitchChannel(id));
};

export const showActionButtins = createAction('ACTION_BUTTONS_SHOW');
export const hideActionButtins = createAction('ACTION_BUTTONS_HIDE');
