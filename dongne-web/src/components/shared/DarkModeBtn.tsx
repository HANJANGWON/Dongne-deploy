import styled from "styled-components";
import { useReactiveVar } from "@apollo/client";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../../apollo";

const DarkModeBtn = styled.span`
  cursor: pointer;
`;

const DarkMode = () => {
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <DarkModeBtn onClick={darkMode ? disableDarkMode : enableDarkMode}>
      <FontAwesomeIcon size="lg" icon={darkMode ? faSun : faMoon} />
    </DarkModeBtn>
  );
};
export default DarkMode;
