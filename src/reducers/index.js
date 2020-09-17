// @ts-check

import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import * as actions from '../actions';

const messages = createReducer([], {
  [actions.newMessage.type]: (state, { payload: { attributes } }) => [...state, attributes],
  [actions.removeChannel.type]: (state, { payload: { id } }) => (
    state.filter((m) => m.channelId !== id)),
});

const currentChannelId = createReducer([], {
  [actions.handleSwitchChannel.type]: (state, { payload: id }) => id,
});

const channels = createReducer([], {
  [actions.newChannel.type]: (state, { payload: { attributes } }) => [...state, attributes],
  [actions.removeChannel.type]: (state, { payload: { id } }) => state.filter((c) => c.id !== id),
  [actions.renameChannel.type]: (state, { payload: { id, attributes } }) => {
    const channel = state.find((c) => c.id === id);
    channel.name = attributes.name;
  },
});

const modalInfo = createReducer({ type: 'none' }, {
  [actions.openModal.type]: (state, { payload }) => payload,
  [actions.closeModal.type]: () => ({ type: 'none' }),
});

const channelsUIState = createReducer({ focusedButtonId: 'none' }, {
  [actions.showActionButtins.type]: (state, { payload }) => payload,
  [actions.hideActionButtins.type]: () => ({ focusedButtonId: 'none' }),
});

export default combineReducers({
  messages,
  channels,
  currentChannelId,
  channelsUIState,
  modalInfo,
});
