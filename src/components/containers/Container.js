const defaults = n => ({
  items: {
    count: 0,
    pageInfo: {},
    nodes: [...Array(n)].map(() => ({}))
  }
});

export const loadMore = Query => ({ data }) => ({
  data: data.items ? data : { ...data, ...defaults(data.variables.first) },
  loadMore: () =>
    data.fetchMore({
      query: Query,
      variables: {
        ...(data.variables || {}),
        cursor: ((data.items || {}).pageInfo || {}).endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const count = fetchMoreResult.items.count;
        const moreNodes = fetchMoreResult.items.nodes;
        const pageInfo = fetchMoreResult.items.pageInfo;

        return {
          items: {
            __typename: previousResult.items.__typename,
            count,
            pageInfo,
            nodes: moreNodes
          }
        };
      }
    })
});

export const defaultOptions = ({ children, sort, cursor, ...props }) => ({
  notifyOnNetworkStatusChange: true,
  variables: {
    sort: (sort || []).concat("id__asc"),
    cursor: cursor || null,
    ...(props || {})
  }
});

export default ({ children, ...props }) => children(props);
