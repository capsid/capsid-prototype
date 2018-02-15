const removeProp = (obj, propToRemove) => {
  if (Array.isArray(obj)) {
    return obj.map(x => removeProp(x, propToRemove));
  } else if (obj && typeof obj === "object") {
    return Object.keys(obj).reduce((acc, x) => {
      if (x === propToRemove) return acc;
      if (typeof obj[x] === "object")
        return { ...acc, [x]: removeProp(obj[x], propToRemove) };
      return { ...acc, [x]: obj[x] };
    }, {});
  } else {
    return obj;
  }
};

export default removeProp;
