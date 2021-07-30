import React, { FC, ReactNode } from "react";
import "./button.css";
import { styled } from "@storybook/theming";

interface Props {
  children: ReactNode;
  onClick: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button: FC<Props> = ({ children, onClick }) => (
  <StyledButton
    type="button"
    className="my-button"
    onClick={onClick}
  >
    {children}
  </StyledButton>
);

const StyledButton = styled.button`
  font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 700;
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  line-height: 1;
  font-size: 14px;
  padding: 11px 20px;
  margin: 1rem;
`
