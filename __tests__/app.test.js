import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '@testing-library/dom';

import nock from 'nock';
// import React from 'react';
import {
  render,
  screen,
  waitFor,
  cleanup,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EventEmitter from 'events';
import { delay } from 'nanodelay';
import _ from 'lodash';

import run from '../src/init';

nock.disableNetConnect();

afterEach(() => {
  cleanup();
});

const host = 'http://localhost';

const websocketEmulate = new EventEmitter();
const sendWsMessage = (type, data) => websocketEmulate.emit('message', { type, data });

const initialState = {
  channels: [
    { id: 1, name: 'general', removable: false },
    { id: 2, name: 'random', removable: false },
  ],
  messages: [],
  currentChannelId: 1,
};

const userName = 'user1 name';
const otherUserName = 'user2 name';

it('send messages, and cwitch channels', async () => {
  const app = run(initialState, { name: userName }, websocketEmulate);
  render(app);
  // first render snapshot 1
  expect(document.body).toMatchSnapshot();

  // recive message to random channel, general active snapshot 2
  const message = {
    attributes: {
      body: 'message to "random" channel',
      nickname: otherUserName,
      channelId: 2,
      id: _.uniqueId(),
    },
  };
  sendWsMessage('newMessage', message);
  expect(document.body).toMatchSnapshot();

  // loading and error on send message snapshot 3
  nock(host)
    .post('/api/v1/channels/1/messages')
    .replyWithError('something awful happened');
  const messageSendForm = screen.getByTestId('message-send-form');
  const messageSendField = screen.getByTestId('message-send-input');
  userEvent.type(messageSendField, 'test message on "general" channel');
  messageSendForm.dispatchEvent(new Event('submit'));

  expect(document.body).toMatchSnapshot();

  // error message snapshot 4
  await waitFor(() => screen.getByText('Network Error'));
  expect(document.body).toMatchSnapshot();

  // send message from general channel snapshot 5
  nock(host)
    .post('/api/v1/channels/1/messages')
    .reply(200, (uri, requestBody) => {
      const attributes = { ...requestBody.data.attributes, id: _.uniqueId() };
      setTimeout(() => sendWsMessage('newMessage', { attributes }));
    });
  messageSendForm.dispatchEvent(new Event('submit'));

  await delay(200);
  expect(document.body).toMatchSnapshot();

  // change channel to random snapshot 6
  const channel2Tab = screen.getByText('random');
  userEvent.click(channel2Tab);
  expect(document.body).toMatchSnapshot();
});

it('add channel', async () => {
  const app = run(initialState, { name: userName }, websocketEmulate);
  render(app);

  // open modal snapshot 1
  const channelAddButton = screen.getByText('+');
  userEvent.click(channelAddButton);
  await waitFor(() => screen.getByText('Add'));
  expect(document.querySelector('.modal-content')).toMatchSnapshot();

  // close modal snapshot 2
  const closeButton = screen.getAllByText('Close')[1];
  userEvent.click(closeButton);
  // await waitForElementToBeRemoved(closeButton);
  expect(document.body).toMatchSnapshot();

  // empty name errorsnapshot 3
  userEvent.click(channelAddButton);
  const submitButton = screen.getByText('Add');
  userEvent.click(submitButton);
  await waitFor(() => screen.getByText('Channel name don\'t must be empty or consist of spaces only'));
  expect(document.querySelector('.modal-content')).toMatchSnapshot();

  //
  nock(host)
    .post('/api/v1/channels')
    .replyWithError('something awful happened');
  const channelAddField = screen.getByTestId('channel-add-input');
  userEvent.type(channelAddField, 'test channel');
  userEvent.click(submitButton);

  // spinner snapshot 4
  expect(document.querySelector('.modal-content')).toMatchSnapshot();

  // network error snapshot 5
  await waitFor(() => screen.getByText('Network Error'));
  expect(document.querySelector('.modal-content')).toMatchSnapshot();

  // add channel snapshot 6
  nock(host)
    .post('/api/v1/channels')
    .reply(200, (uri, requestBody) => {
      const attributes = { ...requestBody.data.attributes, id: 3, removable: true };
      setTimeout(() => sendWsMessage('newChannel', { attributes }));
    });
  userEvent.click(submitButton);

  await waitForElementToBeRemoved(channelAddField);
  expect(document.querySelector('.flex-column')).toMatchSnapshot();
});

it('rename and delete channel', async () => {
  const app = run(initialState, { name: userName }, websocketEmulate);
  render(app);

  // add channel, recive message snapshot 1
  const channel = { attributes: { id: 3, name: 'Foo', removable: true } };
  sendWsMessage('newChannel', channel);

  const message = {
    attributes: {
      body: 'some message to "test" channel',
      nickname: otherUserName,
      channelId: 3,
      id: _.uniqueId(),
    },
  };
  sendWsMessage('newMessage', message);
  expect(document.body).toMatchSnapshot();

  // open test channel menu snapshot 2
  const channelMenuButton = screen.getByText('Foo').nextElementSibling;
  userEvent.click(channelMenuButton);
  expect(document.querySelector('.flex-column')).toMatchSnapshot();

  // open rename modal snapshot 3
  userEvent.click(screen.getByText('Rename'));
  expect(document.querySelector('.modal-content')).toMatchSnapshot();

  // submit the same name snapshot 4
  const submitButton = screen.getAllByText('Rename')[1];
  userEvent.click(submitButton);
  expect(document.querySelector('.modal-content')).toMatchSnapshot();

  // same name error snapshot 5
  await waitFor(() => screen.getByText('The same name!'));
  expect(document.querySelector('.modal-content')).toMatchSnapshot();

  // change channel name snapshot 6
  nock(host)
    .patch('/api/v1/channels/3')
    .reply(200, (uri, requestBody) => {
      const attributes = { ...requestBody.data.attributes };
      setTimeout(() => sendWsMessage('renameChannel', { attributes }));
    });
  const channelNameInput = screen.getByDisplayValue('Foo');
  userEvent.type(channelNameInput, 'Test');
  userEvent.click(submitButton);
  await waitForElementToBeRemoved(screen.getByText('Renaming...'));
  expect(document.querySelector('.flex-column')).toMatchSnapshot();

  // switch channel to Test snapshot 7
  userEvent.click(screen.getByText('Test'));
  expect(document.body).toMatchSnapshot();

  // open delete modal snapshot 8
  userEvent.click(screen.getByText('Delete'));
  expect(document.querySelector('.modal-content')).toMatchSnapshot();

  // network error snapshot 9
  nock(host)
    .delete('/api/v1/channels/3')
    .replyWithError('some error');
  userEvent.click(screen.getAllByText('Delete')[1]);
  await waitFor(() => screen.getByText('Network Error'));
  expect(document.querySelector('.modal-content')).toMatchSnapshot();

  // submit delete snapshot 10
  nock(host)
    .delete('/api/v1/channels/3')
    .reply(200, () => {
      setTimeout(() => sendWsMessage('removeChannel', { id: 3 }));
    });
  userEvent.click(screen.getAllByText('Delete')[1]);
  await waitForElementToBeRemoved(screen.getByText('Deleting...'));
  expect(document.body).toMatchSnapshot();
});
