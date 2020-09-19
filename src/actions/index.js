import { createAction } from '@reduxjs/toolkit';

export const openModal = createAction('MODAL_OPEN');
export const closeModal = createAction('MODAL_CLOSE');

export const addMessage = createAction('MESSAGE_ADD');

export const addChannel = createAction('CHANNEL_ADD');
export const deleteChannel = createAction('CHANNEL_REMOVE');
export const renameChannel = createAction('CHANNEL_RENAME');
export const switchChannel = createAction('CHANNEL_SWITCH');

export const showActionButtins = createAction('ACTION_BUTTONS_SHOW');
export const hideActionButtins = createAction('ACTION_BUTTONS_HIDE');
