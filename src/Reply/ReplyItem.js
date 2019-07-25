import React from 'react';
import '../styles/replyItem.css'

const ReplyItem = props => {
    return (
      <div className="reply">
        <span className="reply-text">{props.reply.text}</span>
        <span className="reply-id">#{props.reply.id.slice(22, 25)}</span>
      </div>
    );
  };
  
export default ReplyItem;