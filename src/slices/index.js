// @ts-check

import { combineReducers } from 'redux';

import channels, { actions as channelsActions } from './channels';
import messages, { actions as messagesActions } from './messages';
import currentChannelId, { actions as currentChannelIdActions } from './currentChannelId';
import modalInfo, { actions as modalInfoActions } from './modalInfo';
import channelsUIState, { actions as channelsUIStateActions } from './channelsUIState';

export default combineReducers({
  messages,
  channels,
  currentChannelId,
  channelsUIState,
  modalInfo,
});

const actions = {
  ...channelsActions,
  ...messagesActions,
  ...currentChannelIdActions,
  ...modalInfoActions,
  ...channelsUIStateActions,
};

export { actions };
