import queryString from "query-string";
import { withPropsOnChange } from "recompose";
import rison from "rison";

export default withPropsOnChange(["params"], ({ params, history }) => ({
  updateSQON: nextSQON =>
    history.push({
      search: queryString.stringify({
        ...params,
        sqon: rison.encode(nextSQON)
      })
    })
}));
