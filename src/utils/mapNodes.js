export default nodes => nodes.map(x => x.node || {}).map(x => x._source || {});
