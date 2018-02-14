import { withPropsOnChange } from "recompose";
import _ from "lodash";

export default defaultSort =>
  withPropsOnChange(["query"], ({ query }) => {
    return {
      sort: query.sort ? _.flatten([query.sort]) : defaultSort
    };
  });
