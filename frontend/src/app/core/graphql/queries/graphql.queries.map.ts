import {gql} from "apollo-angular";

const getcord  = gql`
  query getcord($address: String!)
{
  getcord(address: $address) {
            
            latitude,
            longitude
    }
}`;

export {getcord};