import React from 'react';
import { useSelector } from 'react-redux';

import ChannelAdd from './ChannelAdd';
import ChannelDelete from './ChannelDelete';
import ChannelRename from './ChannelRename';

const forms = {
  add: ChannelAdd,
  delete: ChannelDelete,
  rename: ChannelRename,
};

const ChannelForm = () => {
  const modalType = useSelector((state) => state.modalInfo.type);

  if (!modalType) {
    return null;
  }

  const Form = forms[modalType];

  return <Form />;
};

export default ChannelForm;
