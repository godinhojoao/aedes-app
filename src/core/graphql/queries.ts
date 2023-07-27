import { gql } from '@apollo/client';

export const FIND_ALL_COMPLAINTS_QUERY = gql`
  query findAllComplaints($input: FindAllComplaintsInputDto!) {
    findAllComplaints(input: $input) {
      items {
        id
        status
        description
        createdAt
        formattedAddress
        solverDescription
        denunciatorId
        location {
          id
          city
          state
          street
          neighborhood
          cep
          number
        }
      }
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
