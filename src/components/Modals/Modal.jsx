import React from 'react';
import { connect } from 'react-redux';

import ChannelAdd from './ChannelAdd';
import ChannelDelete from './ChannelDelete';
import ChannelRename from './ChannelRename';

const modals = {
  adding: ChannelAdd,
  deleting: ChannelDelete,
  renaming: ChannelRename,
};

const mapStateToProps = ({ modalInfo: { type } }) => ({ type });

const Modal = (props) => {
  const { type } = props;

  if (type === 'none') {
    return null;
  }
  const Component = modals[type];
  return <Component />;
};

export default connect(mapStateToProps)(Modal);
