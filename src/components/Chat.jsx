// @ts-check

import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MessagesBox from './MessageBox';
import ChannelAddButton from './ChannelAddButton';
import ChannelsNav from './ChannelsNav';

export default (props) => {
  const { initState: { channels, currentChannelId } } = props;

  return (
    <Row className="h-100 pb-3">
      <Col xs={3} className="border-right">
        <ChannelAddButton />
        <ChannelsNav channels={channels} current={currentChannelId} />
      </Col>
      <Col>
        <MessagesBox />
      </Col>
    </Row>
  );
};
