// @ts-check

import io from 'socket.io-client';
import Cookies from 'js-cookie';
import faker from 'faker';
import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

import App from './components/App';
import { addMessage } from './actions';
import UserContext from './components/UserContext';

const getUserName = () => {
  const userName = Cookies.get('nickName');
  if (userName) {
    return userName;
  }
  // faker.locale = 'ru';
  const newName = faker.name.findName();
  Cookies.set('nickName', newName);
  return newName;
};

export default (initialState) => {
  const userNickName = getUserName();
  const userChannelId = Number(Cookies.get('currentChannelId')) || initialState.currentChannelId;

  const preloadedState = {
    channels: initialState.channels,
    messages: initialState.messages,
    currentChannelId: userChannelId,
  };

  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  const webSocket = io();

  webSocket.on('newMessage', ({ data }) => {
    // @ts-ignore
    store.dispatch(addMessage(data));
  });

  ReactDOM.render(
    <Provider store={store}>
      <UserContext.Provider value={userNickName}>
        <App />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
