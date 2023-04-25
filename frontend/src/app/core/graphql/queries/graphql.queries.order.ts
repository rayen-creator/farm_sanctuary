import {gql} from "apollo-angular";

const orders = gql`
  {
    getOrders {
      id,
      cartItems {
        name
        price
        total
        image
        unit
        quantity
      }
      totalPrice
      user {
        username
        email
        phone
location
      }
      isDelivered
      createdAt
      updatedAt
    }
  }
`;

const order = gql`
  query getOrder($id: ID!) {
    getOrder(id: $id) {
      id,
      cartItems {
        name
        price
        total
        image
        unit
        quantity
      }
      totalPrice
      user {
        username
        email
      }
      isDelivered
      createdAt
      updatedAt
    }
  }
`;

const ordersByUser = gql`
  query getOrdersByUser($userId: ID!) {
    getOrdersByUser(userId: $userId) {
      id,
      cartItems {
        name
        price
        total
        image
        unit
        quantity
      }
      totalPrice
      user {
        username
        email
      }
      isDelivered
      createdAt
      updatedAt
    }
  }
`;

const createOrder = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
     message
  }}
`;

const updateOrderDeliveryStatus = gql`
  mutation updateOrderDeliveryStatus($id: ID!, $isDelivered: Boolean!) {
    updateOrderDeliveryStatus(id: $id, isDelivered: $isDelivered) {
      id
      cartItems {
        name
        price
        total
        image
        unit
        quantity
      }
      totalPrice
      isDelivered
      createdAt
      updatedAt
    }
  }
`;



const deleteOrder = gql`
  mutation deleteOrder($id: ID!) {
    deleteOrder(id: $id) {
      id
      cartItems {
        name
        price
        total
        image
        unit
        quantity
      }
      totalPrice
      user {
        username
        email
      }
      isDelivered
      createdAt
      updatedAt
    }
  }
`;

export { orders, order, ordersByUser, createOrder, updateOrderDeliveryStatus, deleteOrder };
