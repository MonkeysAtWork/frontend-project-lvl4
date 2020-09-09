// @ts-check

import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MessagesBox from './MessagesBox';
import ChannelAddButton from './ChannelAddButton';
import ChannelsNav from './ChannelsNav';
import SendMessageForm from './SendMessageForm';

export default () => (
  <Row className="h-100 pb-3">
    <Col xs={3} className="border-right">
      <ChannelAddButton />
      <ChannelsNav />
    </Col>
    <Col className="h-100">
      <div className="d-flex flex-column h-100">
        <MessagesBox />
        <div className="mt-auto">
          <SendMessageForm />
        </div>
      </div>
    </Col>
  </Row>
);
