// @ts-check

import ReactDOM from 'react-dom';
import React from 'react';

import Chat from './components/Chat';

export default (initState) => {
  ReactDOM.render(
    <Chat initState={initState} />,
    document.getElementById('chat'),
  );
};
