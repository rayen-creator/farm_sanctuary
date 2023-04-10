import {gql} from "apollo-angular";


const recommendedproducts = gql`
  {
    getRecommendedProducts{
      title,
      image,
      price,
      category
      url

    }
  }
`;

const RecommendedProductsByCategory = gql`
  query GetRecommendedProductsByCategory($category: productCategory!) {
    GetRecommendedProductsByCategory(category: $category) {
      title
      price
      image
      url
      category
    }
  }
`;

export {recommendedproducts, RecommendedProductsByCategory}