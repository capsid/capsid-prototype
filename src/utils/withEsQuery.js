import { withPropsOnChange } from "recompose";
import FilterProcessor from "@arranger/middleware/dist/filters";

import { removeProp } from "../utils";
import { defaultSQON } from "./withSQON";

export default withPropsOnChange(["sqon"], ({ sqon }) => ({
  esQuery: removeProp(
    new FilterProcessor().buildFilters("", [], sqon || defaultSQON),
    "boost"
  )
}));
