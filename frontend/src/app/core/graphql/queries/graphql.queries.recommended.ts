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

const GET_PRODUCTS_QUERY_INPUTS = gql`
  query {
    products(url: "https://www.marketplace.farm/inputs/") {
      title   
      price
      image
      url
    }
  }
`;

const GET_PRODUCTS_QUERY_WORKSHOP = gql`
    query {
      products(url:"https://www.marketplace.farm/farm-workshop-tools/"){
        title   
        price
        image
        url

      }
    }

`;

const GET_PRODUCTS_QUERY_TYRES = gql`
    query {
      products(url:"https://www.marketplace.farm/tyres"){
        title   
        price
        image
        url

      }
    }

`;


export {recommendedproducts, RecommendedProductsByCategory, GET_PRODUCTS_QUERY_INPUTS , GET_PRODUCTS_QUERY_WORKSHOP ,GET_PRODUCTS_QUERY_TYRES}