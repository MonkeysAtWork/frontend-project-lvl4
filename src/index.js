// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Rollbar from 'rollbar';

import '../assets/application.scss';

// @ts-ignore
import gon from 'gon';
import faker from 'faker';
import cookies from 'js-cookie';
import io from 'socket.io-client';

import run from './init';

const getUserName = () => {
  const userName = cookies.get('nickName');
  if (userName) {
    return userName;
  }
  // faker.locale = 'ru';
  const newName = faker.name.findName();
  cookies.set('nickName', newName);
  return newName;
};

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
} else {
  // eslint-disable-next-line no-unused-vars
  const rollbar = new Rollbar({
    accessToken: 'a98438cbf89d49a983da1f78ad848402',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  });
}

const userData = {
  name: getUserName(),
};

const webSocket = io();

run(gon, userData, webSocket);
