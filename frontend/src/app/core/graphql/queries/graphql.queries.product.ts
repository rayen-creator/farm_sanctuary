import {gql} from "apollo-angular";


const products = gql`
  {
    getProducts{
      id,
      name,
      description,
      price,
      quantity,
      unit,
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
      unit,
      country,
      rating {
        total
        count
        average
      },
      reviews {
        userReview {
          username,
          image
        }
        comment
        rating
        createdAt
      }
      category,
      expirationDate,
      createdAt,
      updatedAt,
      user {
        username
        image
      },
      image
    }
  }
`;
const productsByUser = gql`
  query getProductByUser($userId:ID!)
  {
    getProductsByUser(userId:$userId) {
      id,
      name,
      description,
      price,
      quantity,
      unit,
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
  mutation createProduct($input: CreateProductInput!, $file: Upload) {
    createProduct(input: $input,  file: $file) {
      message
    }
  }
`;

const updateProduct = gql`
  mutation updateProduct($id:ID!,$input: UpdateProductInput!, $file: Upload) {
    updateProduct(id: $id,input: $input,  file: $file) {
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
      unit,
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

const addReview = gql`
  mutation addReviewProduct($idProd:ID!,$idUser:ID!,$input: addReviewInput!) {
    addReviewProduct(idProd: $idUser,idUser: $idProd,input: $input) {
      reviewExist
      message
    }
  }
`;

export {products,product,createProduct,updateProduct,deleteProduct, productsByUser, addReview}
