// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

// import faker from 'faker';
// @ts-ignore
import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

import app from './application';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

// console.log('it works!');
// console.log('gon', gon);

app(gon);
