import { gql } from '@apollo/client';

export const FIND_ALL_COMPLAINTS_QUERY = gql`
  query findAllComplaints($input: FindAllComplaintsInputDto!) {
    findAllComplaints(input: $input) {
      items {
        id
        status
        description
        city
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

export const FIND_COMPLAINT_QUERY = gql`
  query findComplaint ($input: FindComplaintInputDto!) {
    findComplaint (input: $input) {
      id
      status
      solverDescription
      description
      location {
        id
        city
        state
        street
        neighborhood
        cep
        number
      }
      solver {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`;
