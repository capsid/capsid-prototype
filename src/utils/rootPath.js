export default x => {
  const path = typeof x === "string" ? x : x.pathname;
  return path.split("/").filter(Boolean)[0];
};
