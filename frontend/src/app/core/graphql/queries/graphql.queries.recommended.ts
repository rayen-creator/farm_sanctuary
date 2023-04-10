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
  query getRecommendedProductsByCategory($category: recommendedproductCategory!) {
    getRecommendedProductsByCategory(category: $category) {
      title
      price
      image
      url
      category
    }
  }
`;

export {recommendedproducts, RecommendedProductsByCategory}