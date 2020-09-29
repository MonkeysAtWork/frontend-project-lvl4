import React from 'react';
import { connect } from 'react-redux';

import ChannelAdd from './ChannelAdd';
import ChannelDelete from './ChannelDelete';
import ChannelRename from './ChannelRename';

const forms = {
  add: ChannelAdd,
  delete: ChannelDelete,
  rename: ChannelRename,
};

const mapStateToProps = ({ modalInfo: { type } }) => ({ modalType: type });

const ChannelForm = (props) => {
  const { modalType } = props;

  if (!modalType) {
    return null;
  }

  const Form = forms[modalType];

  return <Form />;
};

export default connect(mapStateToProps)(ChannelForm);
