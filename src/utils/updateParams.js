import history from "@capsid/services/history";
import queryString from "query-string";

export default params => {
  history.push({
    search: queryString.stringify({
      ...queryString.parse(history.location.search),
      ...params
    })
  });
};
