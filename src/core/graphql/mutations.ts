import { gql } from '@apollo/client';

export const CREATE_ACCOUNT = gql`
  mutation createAccount ($input: CreateAccountInputDto!) {
    createAccount (input: $input) {
      id
      name
      email
      cpf
      role
    }
  }
`;

export const SIGN_IN = gql`
  mutation signIn ($input: SignInInputDto!) {
    signIn (input: $input) {
      token
      account {
        id
        name
        email
        cpf
        role
      }
    }
  }
`;

export const UPDATE_COMPLAINT = gql`
 mutation updateComplaint ($input: UpdateComplaintInputDto!) {
    updateComplaint (input: $input) {
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

export const CREATE_COMPLAINT = gql`
 mutation createComplaint ($input: CreateComplaintInputDto!) {
    createComplaint (input: $input) {
      id
      status
      description
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
      solver {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`;