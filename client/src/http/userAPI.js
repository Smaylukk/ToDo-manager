import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($username: String, $password: String) {
    public {
      login(username: $username, password: $password) {
        token
      }
    }
  }
`;

export const REGISTRATION = gql`
  mutation Register($username: String, $password: String) {
    public {
      register(username: $username, password: $password) {
        token
      }
    }
  }
`;

export const CHECKAUTH = gql`
  mutation Auth {
    public {
      auth {
        token
      }
    }
  }
`;
