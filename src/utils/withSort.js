import { withPropsOnChange } from "recompose";
import _ from "lodash";

export default defaultSort =>
  withPropsOnChange(["params"], ({ params }) => {
    return {
      sort: params.sort ? _.flatten([params.sort]) : defaultSort
    };
  });
