// @ts-check

import React from 'react';
import { connect } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import cn from 'classnames';

import * as actions from '../actions';

const mapStateToProps = ({ channels, currentChannelId }) => (
  { channels, currentChannelId }
);

const actionCreators = {
  switchChannel: actions.switchChannel,
};

const ChannelsNav = (props) => {
  const { channels, currentChannelId } = props;

  return (
    <Nav variant="pills" as="ul" className="flex-column" fill>
      {channels.map(({ id, name }) => (
        <Nav.Item key={id} as="li">
          <Nav.Link
            as="button"
            className={cn('btn btn-block', { active: id === currentChannelId })}
            onClick={() => props.switchChannel(id)}
          >
            {name}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default connect(mapStateToProps, actionCreators)(ChannelsNav);
