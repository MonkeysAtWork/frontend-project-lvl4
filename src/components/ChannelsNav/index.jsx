// @ts-check

import React from 'react';
import { connect } from 'react-redux';

import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';

import SimpleButton from './SimpleButton';
import DropdownButton from './DropdownButton';
import NavCategory from './NavCategory';

import { actions } from '../../slices';

const mapStateToProps = ({ channels, currentChannelId }) => (
  { channels, currentChannelId }
);

const actionCreators = {
  openModal: actions.openModal,
};

const renderChannelButton = (item) => {
  const ChannelButton = item.removable ? DropdownButton : SimpleButton;

  return (
    <Nav.Item key={item.id} as="li" className="mb-2">
      <ChannelButton item={item} />
    </Nav.Item>
  );
};

const ChannelsNav = (props) => {
  const { channels } = props;

  return (
    <Col xs={3} className="h-100 border-right overflow-auto">
      <NavCategory name="Channels" />
      <Nav variant="pills" as="ul" className="flex-column" fill>
        {channels.map(renderChannelButton)}
      </Nav>
    </Col>
  );
};

export default connect(mapStateToProps, actionCreators)(ChannelsNav);
