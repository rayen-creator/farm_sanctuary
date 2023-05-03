import { gql } from 'apollo-angular';

export const getEvents = gql`
  {
    getEvents {
      id
      title
      description
      start
      end
      type
    }
  }
`;

export const getEvent = gql`
  query getEvent($id: ID!) {
    getEvent(id: $id) {
      id
      title
      description
      start
      end
      type
    }
  }
`;

export const createEvent = gql`
  mutation createEvent($input: eventInput!) {
    createEvent(input: $input) {
      id
      title
      description
      start
      end
      type
    }
  }
`;

export const updateEvent = gql`
  mutation updateEvent($id: ID!, $input: eventInput!) {
    updateEvent(id: $id, input: $input) {
      id
      title
      description
      start
      end
      type
    }
  }
`;

export const deleteEvent = gql`
  mutation deleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      title
      description
      start
      end
      type
    }
  }
`;
