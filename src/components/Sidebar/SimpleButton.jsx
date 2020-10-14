// @ts-check

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';

import { actions } from '../../slices';

const ChannelButton = (props) => {
  const { item } = props;
  // @ts-ignore
  const { currentChannelId } = useSelector((state) => state.channelsInfo);
  const isActive = item.id === currentChannelId;

  const dispatch = useDispatch();
  const switchChannel = (payload) => () => dispatch(actions.switchChannel(payload));

  return (
    <Button
      className="btn-block text-left nav-link"
      onClick={switchChannel(item.id)}
      variant={isActive ? 'primary' : 'light'}
    >
      {item.name}
    </Button>
  );
};

export default ChannelButton;
