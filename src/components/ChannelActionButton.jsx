// @ts-check

import React from 'react';
import { connect } from 'react-redux';

import { actions } from '../slices';

const actionCreators = {
  openModal: actions.openModal,
};

const handleOpenModal = (props) => (e) => {
  const { item, type, openModal } = props;

  e.stopPropagation();
  openModal({ type, item });
};

const ChannelActionButton = (props) => {
  const { children, className, style } = props;

  return (
    <div
      role="button"
      className={className}
      tabIndex={-1}
      onClick={handleOpenModal(props)}
      onKeyDown={() => { }}
      style={style}
    >
      {children}
    </div>
  );
};

export default connect(null, actionCreators)(ChannelActionButton);
