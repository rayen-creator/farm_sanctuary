import {gql} from "apollo-angular";


export const CREATE_NOTIFICATION = gql`
  mutation CreateNotification($content: String!, $type: String!, $recipient: ID!) {
    createNotification(content: $content, type: $type, recipient: $recipient) {
      id
      createdAt
      content
      type
      recipient {
        id
      }
      status
    }
  }
`;

export const MARK_NOTIFICATION_AS_READ = gql`
  mutation MarkNotificationAsRead($id: ID!) {
    markNotificationAsRead(id: $id) {
      id
      createdAt
      content
      type
      recipient {
        id
      }
      status
    }
  }
`;

export const GET_NOTIFICATIONS = gql`
  query GetNotifications {
    notifications {
      id
      createdAt
      content
      type
      recipient {
        id
      }
      status
    }
  }
`;

export const DELETE_NOTIFICATION = gql`
  mutation DeleteNotification($id: ID!) {
    deleteNotification(id: $id) {
      id
      createdAt
      content
      type
      recipient {
        id
      }
      status
    }
  }
`;