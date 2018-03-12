import { addInSQON } from "@arranger/components/dist/SQONView/utils";

export default ({ items, sqon }) =>
  items.reduce(
    (q, { field, value }) =>
      addInSQON(
        {
          op: "and",
          content: [
            {
              op: "in",
              content: { field, value: value ? [value] : [""] }
            }
          ]
        },
        q
      ),
    sqon
  );
