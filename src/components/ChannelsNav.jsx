// @ts-check

import React from 'react';
import { connect } from 'react-redux';

import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import { actions } from '../slices';

const mapStateToProps = ({ channels, currentChannelId }) => (
  { channels, currentChannelId }
);

const actionCreators = {
  switchChannel: actions.switchChannel,
  openModal: actions.openModal,
};

const renderChannelButtons = (props) => {
  const {
    channels,
    currentChannelId,
    switchChannel,
    openModal,
  } = props;

  return channels.map((item) => {
    const isActive = item.id === currentChannelId;
    if (item.removable) {
      return (
        <Nav.Item key={item.id} as="li">
          <Dropdown as={ButtonGroup} className="d-flex mb-2">
            <Button
              className="btn-block text-left nav-link"
              onClick={() => switchChannel(item.id)}
              variant={isActive ? 'primary' : 'light'}
            >
              {item.name}
            </Button>

            <Dropdown.Toggle
              split
              variant={isActive ? 'primary' : 'light'}
            />

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => openModal({ type: 'rename', item })}
              >
                Rename
              </Dropdown.Item>

              <Dropdown.Item
                onClick={() => openModal({ type: 'delete', item })}
              >
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav.Item>
      );
    }
    return (
      <Nav.Item key={item.id} as="li">
        <Button
          className="btn-block text-left nav-link mb-2"
          onClick={() => switchChannel(item.id)}
          variant={isActive ? 'primary' : 'light'}
        >
          {item.name}
        </Button>
      </Nav.Item>
    );
  });
};

const ChannelsNav = (props) => {
  const { openModal } = props;

  return (
    <Col xs={3} className="h-100 border-right overflow-auto">
      <div className="d-flex mb-2">
        <span className="align-self-center">Channels</span>
        <div
          role="button"
          className="btn btn-link p-0 ml-auto"
          tabIndex={-1}
          onClick={() => openModal({ type: 'add' })}
          onKeyDown={() => { }}
        >
          <big>
            +
          </big>
        </div>
      </div>

      <Nav variant="pills" as="ul" className="flex-column" fill>
        {renderChannelButtons(props)}
      </Nav>
    </Col>
  );
};

export default connect(mapStateToProps, actionCreators)(ChannelsNav);
