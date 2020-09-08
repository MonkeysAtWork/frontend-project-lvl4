// @ts-check

import io from 'socket.io-client';
import Cookies from 'js-cookie';
import faker from 'faker';
import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import reducer from './reducers';

import App from './components/App';
import { addMessage } from './actions';
import UserContext from './components/UserContext';

const getNickName = (locale = 'en') => {
  const nickName = Cookies.get('nickName');
  if (nickName) {
    return nickName;
  }
  faker.locale = locale;
  const newName = faker.name.findName();
  Cookies.set('nickName', newName);
  return newName;
};

export default (initState) => {
  const preloadedState = {
    messages: initState.messages,
  };

  const store = configureStore({
    reducer: { messages: reducer },
    preloadedState,
  });

  const webSocket = io();

  webSocket.on('newMessage', ({ data: { attributes } }) => {
    // @ts-ignore
    store.dispatch(addMessage(attributes));
  });

  const userNickName = getNickName('ru');

  ReactDOM.render(
    <Provider store={store}>
      <UserContext.Provider value={userNickName}>
        <App initState={initState} />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
