const defaults = n => ({
  search: ["alignments", "genomes", "projects", "samples", "statistics"].reduce(
    (obj, x) => ({
      ...obj,
      [x]: {
        hits: [...Array(n)].map(() => ({ counts: {} }))
      }
    }),
    {}
  )
});

export const loadMore = Query => ({ data }) => ({
  data: data.search ? data : { ...data, ...defaults(data.variables.size) },
  loadMore: tab => {
    data.fetchMore({
      query: Query,
      variables: {
        ...(data.variables || {}),
        after: data.search[tab].endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const { hits, endCursor } = fetchMoreResult.search[tab];
        return {
          search: {
            ...previousResult.search,
            [tab]: {
              ...previousResult.search[tab],
              hits,
              endCursor
            }
          }
        };
      }
    });
  }
});

export const defaultOptions = ({ children, ...props }) => ({
  notifyOnNetworkStatusChange: true,
  variables: {
    ...(props || {})
  }
});

export default ({ children, ...props }) => children(props);
