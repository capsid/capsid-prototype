import gql from "graphql-tag";
import { graphql } from "react-apollo";

import Container, { defaultOptions, loadMore } from "./Container";

export const fragments = {
  details: gql`
    fragment AccessDetails on Access {
      projectId
      projectLabel
      userId
      userEmail
      access
    }
  `
};

const Query = gql`
  query accessMany($projectId: MongoID!) {
    items: accessMany(filter: { projectId: $projectId }) {
      ...AccessDetails
    }
  }
  ${fragments.details}
`;

export const updateCache = ({ proxy, projectId, nextData }) => {
  const cacheArgs = { query: Query, variables: { projectId } };
  const data = proxy.readQuery(cacheArgs);
  proxy.writeQuery({ ...cacheArgs, data: nextData({ data }) });
};

export default graphql(Query, {
  options: defaultOptions,
  props: loadMore(Query)
})(Container);
