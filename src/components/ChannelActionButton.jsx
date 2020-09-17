// @ts-check

import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

const actionCreators = {
  openModal: actions.openModal,
};

const ChannelActionButton = (props) => {
  const {
    children,
    item,
    action,
    openModal,
    className,
    style,
  } = props;

  const handleClick = (e) => {
    e.stopPropagation();
    openModal({ modalState: action, item });
  };

  return (
    <div
      role="button"
      className={className}
      tabIndex={-1}
      onClick={handleClick}
      onKeyDown={() => { }}
      style={style}
    >
      {children}
    </div>
  );
};

export default connect(null, actionCreators)(ChannelActionButton);
