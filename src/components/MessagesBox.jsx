import React, { useEffect } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({ messages }) => ({ messages });

const MessagesBox = (props) => {
  const { messages } = props;

  useEffect(() => {
    const messageBox = document.getElementById('messages-box');
    messageBox.scrollTop = messageBox.scrollHeight;
  });

  return (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      {messages.length > 0 && messages.map(
        ({ id, nickName, body }) => (
          <div key={id}>
            <b>{nickName}</b>
            :&nbsp;
            {body}
          </div>
        ),
      )}
    </div>
  );
};

export default connect(mapStateToProps)(MessagesBox);
