import React, {useState} from 'react';
import ReplyList from '../Reply/ReplyList';
import ReplyFrom from '../Reply/ReplyForm';
import { MESSAGE_QUERY, LIKE_MESSAGE_MUTATION, DISLIKE_MESSAGE_MUTATION } from '../queries';
import { Mutation } from 'react-apollo';
import '../styles/messageItem.css'

const MessageItem = props => {
  const { id, text, replies, likes, dislikes } = props;
  const [shown, setShown] = useState(false);
  const onReply = () => {
    setShown(true);
  };

  const _updateStoreAfterUpdatingMessage = store => {
    const orderBy = "createdAt_ASC";
    const data = store.readQuery({
      query: MESSAGE_QUERY,
      variables: {
        orderBy,
        filter: ""
      }
    });
    store.writeQuery({
      query: MESSAGE_QUERY,
      data
    });
  };

  return (
    <div className="message">
      <span className="message-text">{text}</span>
      <span className="id">#{id.slice(22, 25)}</span>
      <br />
      <label>{likes}</label>
      <Mutation
        mutation={LIKE_MESSAGE_MUTATION}
        variables={{ messageId: id }}
        update={store => {
          _updateStoreAfterUpdatingMessage(store);
        }}
      >
        {postMutation => (
          <button type="button" onClick={postMutation}>
            <img
              className="like"
              src="https://pngicon.ru/file/uploads/like.png"
              alt="like"
            />
          </button>
        )}
      </Mutation>
      <label>{dislikes}</label>
      <Mutation
        mutation={DISLIKE_MESSAGE_MUTATION}
        variables={{ messageId: id }}
        update={store => {
          _updateStoreAfterUpdatingMessage(store);
        }}
      >
        {postMutation => (
          <button type="button" onClick={postMutation}>
            <img
              className="like"
              src="https://cdn0.iconfinder.com/data/icons/thin-voting-awards/24/thin-0664_dislike_thumb_down_vote-512.png"
              alt="dislike"
            />
          </button>
        )}
      </Mutation>
      <br />
      <ReplyList replies={replies} />
      {shown && <ReplyFrom setShown={setShown} messageId={id} />}
      <button type="button" onClick={onReply}>
        reply
      </button>
    </div>
  );
};

export default MessageItem;