import React from "react";
import { Box } from "grid-styled";
import styled from "react-emotion";
import isUrl from "is-url";

const BorderedTable = styled("table")`
  width: 100%;
  box-shadow: inset 0 -1px 0 0 rgba(16, 22, 26, 0.15);
`;

const DetailsTable = ({ item, keyMap }) => (
  <Box>
    <BorderedTable className="pt-table pt-striped">
      <tbody>
        {Object.keys(keyMap)
          .map(k => ({
            key: keyMap[k],
            value:
              item &&
              item[k] &&
              (Array.isArray(item[k]) ? item[k].join(`, `) : `${item[k]}`)
          }))
          .filter(x => x.value)
          .map(({ key, value }) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{isUrl(value) ? <a href={value}>{value}</a> : value}</td>
            </tr>
          ))}
      </tbody>
    </BorderedTable>
  </Box>
);

export default DetailsTable;
