// @ts-check

import { combineReducers } from 'redux';

import channelsInfo, { actions as channelsActions } from './channelsInfo';
import messagesInfo, { actions as messagesActions } from './messagesInfo';
import modalInfo, { actions as modalActions } from './modalInfo';
import sidebarInfo, { actions as sidebarActions } from './sidebarInfo';

export default combineReducers({
  messagesInfo,
  channelsInfo,
  modalInfo,
  sidebarInfo,
});

const actions = {
  ...channelsActions,
  ...messagesActions,
  ...modalActions,
  ...sidebarActions,
};

export { actions };
