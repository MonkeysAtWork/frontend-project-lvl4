// @ts-check

import React from 'react';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MessagesBox from './MessagesBox';
import ChannelsNav from './ChannelsNav';
import MessageSendForm from './MessageSendForm';
import ChannelAdd from './Modals/ChannelAdd';
import ChannelDelete from './Modals/ChannelDelete';
import ChannelRename from './Modals/ChannelRename';

const mapStateToProps = ({ modalInfo }) => ({ modalInfo });

const App = (props) => {
  const { modalInfo: { modalState } } = props;

  return (
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
      {modalState === 'Add' && <ChannelAdd />}
      {modalState === 'Delete' && <ChannelDelete />}
      {modalState === 'Rename' && <ChannelRename />}
    </Row>
  );
};

export default connect(mapStateToProps)(App);
