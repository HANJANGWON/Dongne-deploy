import styled from "styled-components";

export const Button = styled.input`
  border: none;
  border-radius: 3px;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: ${(props) => props.theme.buttonFontColor};
  text-align: center;
  cursor: pointer;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

export default Button;
