import React from 'react';
import ReplyItem from './ReplyItem';
import '../styles/replyItem.css'

const ReplyList = props => {
    return (
      <div>
        <span>Replies:</span>
        <br />
        {!props.replies[0]
          ? "No one reply"
          : props.replies.map(reply => {
              if (reply) return <ReplyItem key={reply.id} reply={reply} />;
              return null;
            })}
      </div>
    );
};
  

export default ReplyList;