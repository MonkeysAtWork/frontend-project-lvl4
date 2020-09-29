// @ts-check

import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MessagesBox from './MessagesBox';
import ChannelsNav from './ChannelsNav';
import MessageSendForm from './MessageSendForm';
import Modal from './Modal';

const App = () => (
  <Row className="h-100 pb-3">
    <ChannelsNav />
    <Col className="h-100">
      <div className="d-flex flex-column h-100">
        <MessagesBox />
        <div className="mt-auto">
          <MessageSendForm />
        </div>
      </div>
    </Col>
    <Modal />
  </Row>
);

export default App;
