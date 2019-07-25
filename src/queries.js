import gql from 'graphql-tag';

export const MESSAGE_QUERY = gql`
  query MessageQuery($orderBy: MessageOrderByInput $filter: String!) {
    messages(orderBy: $orderBy filter: $filter) {
      count
      messageList {
        id
        text
        likes
        dislikes
        replies {
          id
          text
        }
      }
    }
  }
`;

export const POST_MESSAGE_MUTATION = gql`
  mutation PostMutation($text: String! $likes: Int! $dislikes: Int!) {
    postMessage(text: $text likes: $likes dislikes: $dislikes) {
      id
      text
      likes
      dislikes
      replies {
        id
        text
      }
    }
  }
`;

export const POST_REPLY_MUTATION = gql`
  mutation PostMutation($messageId: String!, $text: String!) {
    postReply(messageId: $messageId, text: $text) {
      id
      text
    }
  }
`;

export const NEW_MESSAGES_SUBSCRIPTION = gql`
  subscription {
    newMessage {
      id
      text
      likes
      dislikes
      replies {
        id
        text
      }
    }
  }
`;

export const LIKE_MESSAGE_MUTATION = gql`
  mutation PostMutation($messageId: String!) {
    likeMessage(messageId: $messageId) {
      id
      text
      likes
      dislikes
      replies {
        id
        text
      }
    }
  }
`;

export const DISLIKE_MESSAGE_MUTATION = gql`
  mutation PostMutation($messageId: String!) {
    dislikeMessage(messageId: $messageId) {
      id
      text
      likes
      dislikes
      replies {
        id
        text
      }
    }
  }
`;