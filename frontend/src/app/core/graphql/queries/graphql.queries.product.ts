import {gql} from "apollo-angular";


const products = gql`
  {
    getProducts{
      id,
      name,
      description,
      price,
      quantity,
      country,
      rating {
        total
        count
        average
      },
      category,
      expirationDate,
      createdAt,
      updatedAt,
      user {
        username
      },
      image

    }
  }
`;
const product = gql`
  query getProduct($id: ID!)
  {
    getProduct(id: $id) {
      id,
      name,
      description,
      price,
      quantity,
      country,
      rating {
        total
        count
        average
      },
      category,
      expirationDate,
      createdAt,
      updatedAt,
      user {
        username
      },
      image
    }
  }
`;

 const createProduct = gql`
  mutation createProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      message
    }
  }
`;

const updateProduct = gql`
  mutation updateProduct($id:ID!,$input: UpdateProductInput!) {
    updateProduct(id: $id,input: $input) {
      message
    }
  }
`;

const deleteProduct = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id,
      name,
      description,
      price,
      quantity,
      country,
      rating {
        total
        count
        average
      },
      category,
      expirationDate,
      createdAt,
      updatedAt,
      user {
        username
      },
      image

    }
  }
`;

export {products,product,createProduct,updateProduct,deleteProduct}
