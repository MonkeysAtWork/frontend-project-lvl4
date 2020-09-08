import { createReducer } from '@reduxjs/toolkit';
// import { combineReducers } from 'redux';
import * as actions from '../actions';

const messages = createReducer([], {
  [actions.addMessage]: (state, { payload }) => { state.push(payload); },
});

// export default combineReducers({
//   messages,
// });

export default messages;
