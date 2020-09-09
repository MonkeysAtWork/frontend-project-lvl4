import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import * as actions from '../actions';

const messages = createReducer([], {
  [actions.addMessage]: (state, { payload: { attributes } }) => { state.push(attributes); },
});

const currentChannelId = createReducer([], {
  [actions.switchChannelSuccess]: (state, { payload: id }) => id,
});

const channels = createReducer([], (state) => state);

export default combineReducers({
  channels,
  messages,
  currentChannelId,
});
