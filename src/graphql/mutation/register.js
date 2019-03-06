import gql from "graphql-tag";

export default gql`
  mutation register($name: String!, $password: String!, $email: String!) {
    register(name: $name, password: $password, email: $email) {
      token
      user {
        name
        id
      }
    }
  }
`;
