import { gql } from 'apollo-angular';

const createEventsFromScenario = gql`
  mutation createEventsFromScenario($label: String!) {
    createEventsFromScenario(label: $label) {
      _id
      title
      description
      start
      end
      type
      scenarioLabel
      isAuto
    }
  }
`;
export {createEventsFromScenario}
