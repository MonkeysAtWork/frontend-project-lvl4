// @ts-check

import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import * as actions from '../actions';

const messages = createReducer([], {
  [actions.newMessage]: (state, { payload: { attributes } }) => [...state, attributes],
  [actions.removeChannel]: (state, { payload: { id } }) => state.filter((m) => m.channelId !== id),
});

const currentChannelId = createReducer([], {
  [actions.handleSwitchChannel]: (state, { payload: id }) => id,
});

const channels = createReducer([], {
  [actions.newChannel]: (state, { payload: { attributes } }) => [...state, attributes],
  [actions.removeChannel]: (state, { payload: { id } }) => state.filter((c) => c.id !== id),
  [actions.renameChannel]: (state, { payload: { id, attributes } }) => {
    const channel = state.find((c) => c.id === id);
    channel.name = attributes.name;
  },
});

const modalInfo = createReducer({ modalState: 'none' }, {
  [actions.openModal]: (state, { payload }) => payload,
  [actions.closeModal]: () => ({ modalState: 'none' }),
});

const channelsUIState = createReducer({ focusedButtonId: 'none' }, {
  [actions.showActionButtins]: (state, { payload }) => payload,
  [actions.hideActionButtins]: () => ({ focusedButtonId: 'none' }),
});

export default combineReducers({
  messages,
  channels,
  currentChannelId,
  channelsUIState,
  modalInfo,
});
