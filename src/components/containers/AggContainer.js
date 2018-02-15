const aggsConfigToGraphQL = aggs =>
  aggs
    .map(x => ({ ...x, type: x.type === "numeric" ? "stats" : "terms" }))
    .map(({ field, type }) => ({ key: field, value: { [type]: { field } } }));

export const defaultProps = ({ data }) => ({
  aggregations: (data.items || {}).aggregations || {},
  loading: data.loading || false
});

export const defaultOptions = ({ children, config, ...props }) => ({
  notifyOnNetworkStatusChange: true,
  variables: {
    aggs: aggsConfigToGraphQL(config),
    ...(props || {})
  }
});

export default ({ children, ...props }) => children(props);
