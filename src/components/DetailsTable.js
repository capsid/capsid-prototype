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
        {Object.keys(keyMap).map(k => (
          <tr>
            <td>{keyMap[k]}</td>
            <td>
              {isUrl(item[k]) ? <a href={item[k]}>{item[k]}</a> : item[k]}
            </td>
          </tr>
        ))}
      </tbody>
    </BorderedTable>
  </Box>
);

export default DetailsTable;
