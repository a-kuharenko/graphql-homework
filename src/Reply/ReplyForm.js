import React, {useState} from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../styles/replyForm.css'
import { Mutation } from 'react-apollo';
import { MESSAGE_QUERY, POST_REPLY_MUTATION } from '../queries';

const ReplyForm = props => {
  const { messageId, setShown } = props;
  const [text, setText] = useState("");
  const onClose = () => {
    setShown(false);
  };

  const onChange = e => {
    setText(e.target.value);
  };

  const onClick = fn => {
    if (text) fn();
  };

  const _updateStoreAfterAddingReply = (store, newReply, messageId) => {
    const orderBy = "createdAt_ASC";
    const data = store.readQuery({
      query: MESSAGE_QUERY,
      variables: {
        orderBy,
        filter: ""
      }
    });
    const repliedMessage = data.messages.messageList.find(
      item => item.id === messageId
    );
    repliedMessage.replies.push(newReply);
    store.writeQuery({ query: MESSAGE_QUERY, data });
    setShown(false);
  };

  const displayFrom = () => {
    return (
      <div>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Reply message</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <textarea
              onChange={e => onChange(e)}
              placeholder="Введите сообщение"
            ></textarea>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={onClose} variant="secondary">
              Close
            </Button>
            <Mutation
              mutation={POST_REPLY_MUTATION}
              variables={{ messageId, text }}
              update={(store, { data: { postReply } }) => {
                _updateStoreAfterAddingReply(store, postReply, messageId);
              }}
            >
              {postMutation => (
                <Button onClick={() => onClick(postMutation)} variant="primary">
                  Post
                </Button>
              )}
            </Mutation>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  };
  return displayFrom();
};

export default ReplyForm;