import React from "react";
import styled from "styled-components";
import { RouteProps } from "react-router";

import { Container } from "../containerStyles";

const Main = styled(Container)`
  > .page-content .page-enter {
    opacity: 0.01;
  }
  > .page-content .page-enter.page-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-in;
    position: absolute;
  }
  > .page-content .page-exit {
    opacity: 1;
  }
  > .page-content .page-exit.page-exit-active {
    opacity: 0.01;
    transition: opacity 300ms ease-in;
  }
`;

const MainWrapper: React.FC<RouteProps> = (props) => {
  return (
    <Main>
      <main className="page-content">{props.children}</main>
    </Main>
  );
};

export default MainWrapper;
