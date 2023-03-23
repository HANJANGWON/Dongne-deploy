import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  border-radius: 3px;
  padding: 7px;
  background-color: ${(props) => props.theme.bgColor};
  border: 0.5px solid ${(props) => props.theme.borderColor};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    border-color: ${(props) => props.theme.borderAccent};
    background-color: ${(props) => props.theme.bgColor};
  }
`;
