import styled from "styled-components";

export const BaseBox = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
  width: 100%;
`;

export const FatLink = styled.span`
  font-weight: 600;
  color: ${(props) => props.theme.FatLink};
`;

export const SubTitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;
export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FatText = styled.span`
  font-weight: 600;
`;
