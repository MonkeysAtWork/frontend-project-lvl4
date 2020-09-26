// @ts-check

import React from 'react';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/Button';

import { actions } from '../../slices';

const mapStateToProps = ({ currentChannelId }) => (
  { currentChannelId }
);

const actionCreators = {
  switchChannel: actions.switchChannel,
};

const ChannelButton = (props) => {
  const { switchChannel, item, currentChannelId } = props;
  const isActive = item.id === currentChannelId;

  return (
    <Button
      className="btn-block text-left nav-link"
      onClick={() => switchChannel(item.id)}
      variant={isActive ? 'primary' : 'light'}
    >
      {item.name}
    </Button>
  );
};

export default connect(mapStateToProps, actionCreators)(ChannelButton);
