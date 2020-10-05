// @ts-check

import { combineReducers } from 'redux';

import channelsInfo, { actions as channelsActions } from './channelsInfo';
import messagesInfo, { actions as messagesActions } from './messagesInfo';
import modalInfo, { actions as modalActions } from './modalInfo';

export default combineReducers({
  messagesInfo,
  channelsInfo,
  modalInfo,
});

const actions = {
  ...channelsActions,
  ...messagesActions,
  ...modalActions,
};

export { actions };
