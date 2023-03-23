import { useQuery } from "@apollo/client";
import { AnimatePresence } from "framer-motion";
import { PathMatch, useMatch, useParams } from "react-router-dom";
import styled from "styled-components";
import Post from "../components/feed/Post";
import PageTitle from "../components/PageTitle";
import SEARCH_POSTS from "../documents/queries/searchPosts.query";
import UploadPost from "./UploadPost";

const SearchPostsContainer = styled.div`
  margin-top: 100px;
`;

const SearchPosts = () => {
  const uploadPostPathMath: PathMatch<"keyword"> | null = useMatch(
    `/search/:keyword/posts/upload`
  );

  const { keyword } = useParams();
  const { data } = useQuery(SEARCH_POSTS, {
    variables: {
      keyword,
    },
  });

  return (
    <SearchPostsContainer>
      <AnimatePresence>{uploadPostPathMath && <UploadPost />}</AnimatePresence>
      <PageTitle title="Search"></PageTitle>
      {data === undefined
        ? null
        : data.searchPosts.ok
        ? data?.searchPosts?.posts.map((post: any) => (
            <Post key={post.id} {...post} />
          ))
        : `"${keyword}" ${data?.searchPosts?.message}`}
    </SearchPostsContainer>
  );
};
export default SearchPosts;
