import { withPropsOnChange } from "recompose";
import rison from "rison";

export const defaultSQON = { op: "and", content: [] };

export default withPropsOnChange(["params"], ({ params }) => {
  return {
    sqon: params.sqon ? rison.decode(params.sqon) : defaultSQON
  };
});
