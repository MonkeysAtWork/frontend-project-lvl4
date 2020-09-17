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
    type,
    openModal,
    className,
    style,
  } = props;

  const handleOpenModal = (e) => {
    e.stopPropagation();
    openModal({ type, item });
  };

  return (
    <div
      role="button"
      className={className}
      tabIndex={-1}
      onClick={handleOpenModal}
      onKeyDown={() => { }}
      style={style}
    >
      {children}
    </div>
  );
};

export default connect(null, actionCreators)(ChannelActionButton);
