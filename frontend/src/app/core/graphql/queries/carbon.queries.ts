import { gql } from 'apollo-angular';

export const createCarbon = gql`
  mutation createCarbon($input: carbonInput!) {
    createCarbon(input: $input) {
      carbon {
        id
        date
        energy_emissions
        Electricity_Emissions
        fertilizer_emissions
        livestock_emissions
        crop_emissions
        totalcarbonfootprint
      }
      message
    }
  }
`;
