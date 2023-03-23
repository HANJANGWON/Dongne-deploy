import styled from "styled-components";
import basic_image from "../../pages/images/basic_user.jpeg";

// interface AvatarProps {
//   size: string;
//   url?: string | null | undefined;
// }

const SAvatar = styled.div<{ lg: string }>`
  width: ${(props) => (props.lg ? "30px" : "25px")};
  height: ${(props) => (props.lg ? "30px" : "25px")};
  border-radius: 50%;
  background-color: #2c2c2c;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

const Avatar = ({ url = "", lg = false }: any) => {
  return (
    <SAvatar lg={lg}>
      {url !== "" ? <Img src={url || basic_image} /> : null}
    </SAvatar>
  );
};

export default Avatar;
