import React, {useState} from 'react';
import { Query } from 'react-apollo';
import MessageItem from './MessageItem';
import { MESSAGE_QUERY, NEW_MESSAGES_SUBSCRIPTION } from '../queries';
import '../styles/messageList.css'

const MessageList = props => {
  const [orderBy, setOrderBy] = useState("createdAt_ASC");
  const [filter, setFilter] = useState("");
  let tempFilter = "";
  
  const onSelect = e => {
    setOrderBy(e.target.value);
  };

  const onChange = e => {
    tempFilter = e.target.value;
  };

  const onFilter = () => {
    setFilter(tempFilter);
    tempFilter = "";
  };

  const onShowAll = () => {
    tempFilter = "";
    setFilter(tempFilter);
  };

  const _subscribeToNewMessages = subscribeToMore => {
    subscribeToMore({
      document: NEW_MESSAGES_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { newMessage } = subscriptionData.data;
        const exists = prev.messages.messageList.find(
          ({ id }) => id === newMessage.id
        );
        if (exists) return prev;

        return {
          ...prev,
          messages: {
            messageList: [newMessage, ...prev.messages.messageList],
            count: prev.messages.messageList.length + 1,
            __typename: prev.messages.__typename
          }
        };
      }
    });
  };

  return (
    <Query query={MESSAGE_QUERY} variables={{ orderBy, filter }}>
      {({ loading, error, data, subscribeToMore }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Fetch error</div>;
        _subscribeToNewMessages(subscribeToMore);

        const {
          messages: { messageList }
        } = data;

        return (
          <div className="message-list">
            <select onChange={e => onSelect(e)}>
              <option value="createdAt_ASC">Сортировать по</option>
              <option value="createdAt_DESC">
                времени написания(сначала новые)
              </option>
              <option value="createdAt_ASC">
                времени написания(сначала старые)
              </option>
              <option value="likes_DESC">количеству лайков</option>
              <option value="dislikes_DESC">количеству дизлайков</option>
            </select>
            <div className="search-input">
              <input type="text" onChange={e => onChange(e)}></input>
              <button onClick={onFilter}>Поиск</button>
              <button onClick={onShowAll}>Показать все</button>
            </div>
            {messageList.map(item => {
              return <MessageItem key={item.id} {...item} />;
            })}
          </div>
        );
      }}
    </Query>
  );
};

export default MessageList;