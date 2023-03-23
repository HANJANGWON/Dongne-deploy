import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    fontColor?: string;
    bgColor?: string;
    accent?: string;
    borderColor?: string;
    buttonFontColor?: string;
    googleLogin?: string;
    FatLink?: string;
    borderAccent?: string;
    bgContainerColor?: string;
    inputBgColor?: string;
    deleteColor?: string;
    HomeInfoContainerColor?: string;
    grayTextColor?: string;
    lightGrayTextColor?: string;
  }
}
