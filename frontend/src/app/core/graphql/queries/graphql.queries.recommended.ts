import {gql} from "apollo-angular";

const recommendedProduct = gql`
    query getRecommendedProductById($asin: String!)
    {
        getRecommendedProductById(asin: $asin):{
            asin,
            title,
            imageUrl,
            price,
            rating
        }
    }


`;

export { recommendedProduct } 