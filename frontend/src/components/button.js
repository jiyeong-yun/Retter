import React from "react";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;

  color: ${props => props.color || "gray"};
  background: ${props => props.background || "white"};

  ${props => props.primary && css`
  color: white;
  background: navy;
  border-color: navy;
  `}
`

// Button이 쓰이는 곳에 color나 background를 써서 변경도 가능
function Button({ children, ...props }) {
  return (
    <StyledButton {...props}>{children}</StyledButton>
  )
}

export default Button;