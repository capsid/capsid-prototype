import React from "react";
import styled from "react-emotion";
import { Flex } from "grid-styled";
import { Button, Card, Overlay } from "@blueprintjs/core";

const FullViewFlex = styled(Flex)`
  width: 100vw;
  height: 100vh;
`;

const RelativeDiv = styled("div")`
  position: relative;
`;

const TopRightButton = styled(Button)`
  position: absolute;
  top: -15px;
  right: -15px;
`;

const Modal = ({ children, close, isOpen }) => (
  <Overlay isOpen={isOpen} onClose={() => close()}>
    <FullViewFlex alignItems="center" justifyContent="center">
      <Card elevation={Card.ELEVATION_TWO}>
        <RelativeDiv>
          <TopRightButton
            className="pt-minimal"
            iconName="delete"
            onClick={() => close()}
          />
        </RelativeDiv>
        {children}
      </Card>
    </FullViewFlex>
  </Overlay>
);

export default Modal;
