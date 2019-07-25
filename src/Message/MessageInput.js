import React, {useState} from 'react';
import { Mutation } from 'react-apollo';
import { POST_MESSAGE_MUTATION, MESSAGE_QUERY } from '../queries';
import '../styles/messageInput.css'

function MessageInput() {
  const [message, setMessage] = useState("");

  const _updateStoreAfterAddingMessage = (store, newMessage) => {
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

  const onChange = e => {
    setMessage(e.target.value);
  };

  const onBlur = e => {
    e.target.value = "";
  };

  return (
    <div className="messageInput">
      <div className="input">
        <textarea
          placeholder="Message"
          onChange={onChange}
          onBlur={onBlur}
        ></textarea>
        <Mutation
          mutation={POST_MESSAGE_MUTATION}
          variables={{ text: message, likes: 0, dislikes: 0 }}
          update={(store, { data: { postMessage } }) => {
            _updateStoreAfterAddingMessage(store, postMessage);
          }}
        >
          {postMutation => <button onClick={postMutation}>Send</button>}
        </Mutation>
      </div>
    </div>
  );
}
  
  export default MessageInput;
  