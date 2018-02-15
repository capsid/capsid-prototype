import { withPropsOnChange } from "recompose";
import queryString from "query-string";

export default withPropsOnChange(
  ["location"],
  ({ location: { search: searchStr } }) => {
    return {
      query: queryString.parse(searchStr)
    };
  }
);
