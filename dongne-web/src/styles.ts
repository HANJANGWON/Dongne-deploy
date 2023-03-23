import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

export const lightTheme: DefaultTheme = {
  accent: "#348dec",
  bgColor: "#FAFAFA",
  bgContainerColor: "white",
  fontColor: "rgb(38, 38, 38)",
  borderColor: "rgb(219, 219, 219)",
  buttonFontColor: "white",
  googleLogin: "#385285",
  FatLink: "rgb(142, 142, 142)",
  borderAccent: "#2c2c2c",
  inputBgColor: "#fafafa",
  deleteColor: "#ed4956",
  HomeInfoContainerColor: "#eff6fa",
  grayTextColor: "#8F8F8F",
  lightGrayTextColor: "rgb(199, 199, 199)",
};

export const darkTheme: DefaultTheme = {
  accent: "lightgray",
  bgColor: "#2c2c2c",
  bgContainerColor: "#2b2b2b",
  fontColor: "white",
  borderColor: "#8b8b8b",
  buttonFontColor: "#2c2c2c",
  googleLogin: "lightgray",
  FatLink: "rgb(180, 180, 180)",
  inputBgColor: "black",
  deleteColor: "#ed4956",
  HomeInfoContainerColor: "#3d3d3d",
  grayTextColor: "#8F8F8F",
  lightGrayTextColor: "rgb(199, 199, 199)",
};

export const GlobalStyles = createGlobalStyle`
    ${reset};
    * {
      box-sizing: border-box;
    }
    input {
      all:unset;
    }
  
    body { 
        background-color: ${(props) => props.theme.bgColor};
        font-size: 14px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        color: ${(props) => props.theme.fontColor}
    }
    a {
      text-decoration: none;
      color:inherit;
    }
   
`;
