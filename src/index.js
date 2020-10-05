// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Rollbar from 'rollbar';

import '../assets/application.scss';

import ReactDOM from 'react-dom';

// @ts-ignore
import gon from 'gon';
import faker from 'faker';
import cookies from 'js-cookie';
import io from 'socket.io-client';

import Slack from './init';

const setUserName = () => {
  const userName = cookies.get('nickame');
  if (userName) {
    return userName;
  }
  // faker.locale = 'ru';
  const newName = faker.name.findName();
  cookies.set('nickame', newName, { expires: 365 });
  return newName;
};

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
} else {
  // eslint-disable-next-line no-new
  new Rollbar({
    accessToken: 'a98438cbf89d49a983da1f78ad848402',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  });
}

const userData = {
  name: setUserName(),
};

const webSocket = io();

ReactDOM.render(
  Slack(gon, userData, webSocket),
  document.getElementById('chat'),
);
