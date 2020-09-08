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

  // eslint-disable-next-line functional/no-let
  let userNickName = Cookies.get('nickName');

  if (!userNickName) {
    // faker.locale = 'ru';
    userNickName = faker.name.findName();
    Cookies.set('nickName', userNickName);
  }

  ReactDOM.render(
    <Provider store={store}>
      <UserContext.Provider value={userNickName}>
        <App initState={initState} />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
