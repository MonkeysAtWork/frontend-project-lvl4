import React from 'react';

import MessagesBox from './MessagesBox';
import MessageSendForm from './MessageSendForm';

const Chat = (props) => {
  const { className } = props;

  return (
    <div className={className}>
      <div className="d-flex flex-column h-100">
        <MessagesBox />
        <div className="mt-auto">
          <MessageSendForm />
        </div>
      </div>
    </div>
  );
};

export default Chat;
