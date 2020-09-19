// @ts-check

import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import rootReducer from './reducers';
import App from './components/App';
import * as actions from './actions';
import UserContext from './components/UserContext';

const eventsActions = {
  newMessage: actions.addMessage,
  newChannel: actions.addChannel,
  removeChannel: actions.deleteChannel,
  renameChannel: actions.renameChannel,
};

export default (preloadedState, userData, webSocket) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  webSocket.on('message', ({ type, data }) => {
    store.dispatch(eventsActions[type](data));
  });

  ReactDOM.render(
    <Provider store={store}>
      <UserContext.Provider value={userData.name}>
        <App />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
