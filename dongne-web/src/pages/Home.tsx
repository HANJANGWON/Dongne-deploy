import { useQuery } from "@apollo/client";
import Post from "../components/feed/Post";
import PageTitle from "../components/PageTitle";
import FEED_QUERY from "../documents/queries/seeFeed.query";
import { AnimatePresence } from "framer-motion";
import { useMatch, PathMatch } from "react-router-dom";
import UploadPost from "./UploadPost";
import { useCallback, useEffect } from "react";
import styled from "styled-components";
import useUser from "../hooks/useUser";
import { Link } from "react-router-dom";
import basic_image from "../pages/images/basic_user.jpeg";

const HomeContainer = styled.div`
  margin-top: 100px;
  display: flex;
`;

const PostsContainer = styled.div``;

const InfoContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 100px;
  margin: 100px 0px 0px 0px;
  text-align: center;
  width: 250px;
  height: 300px;
  background-color: ${(props) => props.theme.HomeInfoContainerColor};
  border: solid 1px ${(props) => props.theme.borderColor};
  border-radius: 20px;
`;

const InfoAvatar = styled.img`
  margin-top: 20px;
  height: 70px;
  width: 70px;
  border-radius: 50%;
`;

const InfoUsername = styled.div`
  font-weight: 600;
  margin: 20px 0px 0px 0px;
  font-size: 17px;
  padding-bottom: 40px;
  border-bottom: solid 1px ${(props) => props.theme.borderColor};
`;

const InfoBio = styled.div`
  margin-top: 50px;
`;

const Home = () => {
  const uploadPostPathMath: PathMatch<string> | null =
    useMatch("/posts/upload");
  const { data: userData } = useUser();
  const { data, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      offset: 0,
    },
  });

  //pagination posts
  const handleScroll = useCallback(async (): Promise<void> => {
    const scrollTop: number = document.documentElement.scrollTop;
    const innerHeight: number = window.innerHeight;
    const scrollHeight: number = document.body.scrollHeight;
    if (scrollTop + innerHeight >= scrollHeight) {
      await fetchMore({ variables: { offset: data?.seeFeed?.length } });
    }
  }, [data, fetchMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <HomeContainer>
      <AnimatePresence>
        {uploadPostPathMath &&
          uploadPostPathMath.pathname === "/posts/upload" && <UploadPost />}
      </AnimatePresence>

      <PageTitle title="Home"></PageTitle>
      <PostsContainer>
        {data?.seeFeed?.map((post: any) => (
          <Post key={post.id} {...post} />
        ))}
      </PostsContainer>
      <InfoContainer>
        <Link to={`/users/${userData?.me?.username}`}>
          <InfoAvatar src={userData?.me?.avatar || basic_image} />
          <InfoUsername>{userData?.me?.username}</InfoUsername>
        </Link>
        <InfoBio>{userData?.me?.bio}</InfoBio>
      </InfoContainer>
    </HomeContainer>
  );
};
export default Home;
