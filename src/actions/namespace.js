const namespace = (_namespace, constants) => {
  return Object.freeze(
    constants.reduce((obj, constant) => {
      return {
        ...obj,
        [constant]: `${_namespace}/${constant}`
      };
    }, {})
  );
};

export default namespace;
