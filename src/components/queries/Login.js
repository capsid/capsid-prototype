import gql from "graphql-tag";

const Query = gql`
  query Login($token: String!, $provider: String!) {
    item: login(token: $token, provider: $provider) {
      token
      email
      firstName
      lastName
      superUser
      access {
        projectId
        access
      }
    }
  }
`;

export default Query;
