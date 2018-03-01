import { withPropsOnChange } from "recompose";
import FilterProcessor from "@arranger/middleware/dist/filters";

import { removeProp } from "@capsid/utils";
import { defaultSQON } from "@capsid/utils/withSQON";

export default withPropsOnChange(["sqon"], ({ sqon }) => ({
  esQuery: removeProp(
    new FilterProcessor().buildFilters("", [], sqon || defaultSQON),
    "boost"
  )
}));
