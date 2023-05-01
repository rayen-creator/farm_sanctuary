import {gql} from "apollo-angular";

const getcord  = gql`
  query getcord($address: String!)
{
  getdeliveryAgent(address: $address) {
            
            latitude,
            longitude
    }
}`;

export {getcord};