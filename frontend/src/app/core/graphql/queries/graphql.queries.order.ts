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
      farmer {
        username
        email
        phone
        location
      }
      location{
        codePostal,
        state,
        houseStreetnumber,
        country,
        city
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
      farmer {
        username
        email
        phone
        location
      }
      location{
        codePostal,
        state,
        houseStreetnumber,
        country,
        city
      }
      isDelivered
      isConfirmed
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
      farmer {
        username
        email
        phone
        location
      }
      location{
        codePostal,
        state,
        houseStreetnumber,
        country,
        city
      }
      isDelivered
      createdAt
      updatedAt
    }
  }
`;

const ordersByFarmer = gql`
  query getOrdersByFarmer($farmerId: ID!) {
    getOrdersByFarmer(farmerId: $farmerId) {
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
      farmer {
        username
        email
        phone
        location
      }
      location{
        codePostal,
        state,
        houseStreetnumber,
        country,
        city
      }
      isDelivered
      isConfirmed
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

const updateOrderConfirmationStatus = gql`
  mutation updateOrderDeliveryStatus($id: ID!, $isConfirmed: Boolean!) {
    updateOrderConfirmationStatus(id: $id, isConfirmed: $isConfirmed) {
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

export { orders, order, ordersByUser, createOrder, updateOrderDeliveryStatus, deleteOrder, updateOrderConfirmationStatus, ordersByFarmer };
