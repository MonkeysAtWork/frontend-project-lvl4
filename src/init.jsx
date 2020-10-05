// @ts-check

import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import rootReducer, { actions } from './slices';
import App from './components/App';
import UserContext from './UserContext';

const eventsActions = {
  newMessage: actions.addMessage,
  newChannel: actions.addChannel,
  removeChannel: actions.deleteChannel,
  renameChannel: actions.renameChannel,
};

export default (initState, userData, webSocket) => {
  const { channels, currentChannelId, messages } = initState;

  const preloadedState = {
    messagesInfo: { messages },
    channelsInfo: { channels, currentChannelId },
  };

  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  webSocket.on('message', ({ type, data }) => {
    store.dispatch(eventsActions[type](data));
  });

  return (
    <Provider store={store}>
      <UserContext.Provider value={userData.name}>
        <App />
      </UserContext.Provider>
    </Provider>
  );
};
