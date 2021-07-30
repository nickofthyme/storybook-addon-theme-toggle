import { DecoratorFunction } from "@storybook/addons";
import { styled } from "@storybook/theming";
import React from "react";

export const Decorator: DecoratorFunction<JSX.Element> = (Story, context) => {
  const { globals } = context;

  return (
    <Container>
      <Story {...context} />
      <br />
      <StyledPre>
        {`// globals\n${JSON.stringify(globals, null, 2)}`}
      </StyledPre>
    </Container>
  );
};

const Container = styled.div`
  margin: 3rem;
`

const StyledPre = styled.pre`
  margin-top: 2rem;
  padding: 1rem;
  background-color: #eee;
  border-radius: 3px;
`
