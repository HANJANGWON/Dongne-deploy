import styled from "styled-components";
import PageTitle from "../../components/PageTitle";
import { AnimatePresence, motion } from "framer-motion";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import Avatar from "../../components/shared/Avatar";
import Username from "../../components/shared/Username";
import { useMutation, useQuery } from "@apollo/client";
import SEE_POST_QUERY from "../../documents/queries/seePost.query";
import Comments from "../../components/feed/Comments";
import { ModalBackground, modalVariants } from "../../shared/shared";
import DELETE_POST_MUTATION from "../../documents/mutations/deletePost.mutation";

const ModalCloseBtn = styled.button`
  position: fixed;
  top: 14px;
  right: 14px;
  font-size: 29px;
  font-weight: 100;
  border: none;
  outline: none;
  cursor: pointer;
  z-index: 200;
  color: white;
  background-color: transparent;
`;

const ModalBox = styled(motion.div)`
  position: fixed;
  max-width: 1100px;
  max-height: 800px;
  width: 1100px;
  height: 800px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  outline: none;
  border-radius: 10px;
  background-color: ${(props) => props.theme.bgContainerColor};
  overflow: hidden;
  z-index: 120;
`;

const Modalheader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 13px 0;
  border-bottom: 1px solid lightgray;

  h2 {
    font-weight: 600;
  }
`;

const DeletePost = styled.button`
  position: absolute;
  right: 15px;
  text-align: center;
  padding: 8px 2px;
  cursor: pointer;
  font-weight: 600;
  border: none;
  background-color: transparent;
  color: ${(porps) => porps.theme.deleteColor};
`;

const ModalMain = styled.div`
  display: flex;
  height: calc(100% - 40px);
`;

const ModalPhoto = styled.div`
  max-width: 700px;
  border-right: 1px solid lightgray;
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  overflow: hidden;

  label {
    color: lightgray;
    text-align: center;
    cursor: pointer;
  }
`;

const Photo = styled.img`
  width: 100%;
`;

const ModalPostInfo = styled.div`
  flex: 1.1;
  max-width: 400px;
  padding: 15px;
  box-sizing: border-box;
  border-bottom: 1px solid lightgray;
  height: 540px;
  border: none;
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  gap: 7px;
`;

const PostCaption = styled.div`
  background-color: ${(props) => props.theme.bgContainerColor};
  color: ${(props) => props.theme.fontColor};
  resize: none;
  outline: none;
  border-bottom: solid 1px lightgray;
  width: 100%;
  height: 400px;
  font-size: 15px;
  line-height: 1.5;
`;

const ProfilePost = () => {
  const navigate: NavigateFunction = useNavigate();
  const { postId } = useParams();
  const id = parseInt(postId as string);
  const closeModal = (): void => {
    navigate(-1);
  };
  const { data } = useQuery(SEE_POST_QUERY, {
    variables: {
      id,
    },
  });

  const updateDeletePost = (cache: any, result: any) => {
    const {
      data: {
        deletePost: { ok },
      },
    } = result;

    if (ok) {
      cache.evict({
        id: "ROOT_QUERY",
        fields: {
          seePost(prev: any) {
            return [...prev];
          },
        },
      });
    }
  };
  const [deletePostMutation] = useMutation(DELETE_POST_MUTATION, {
    variables: { id },
    update: updateDeletePost,
  });

  const onDeletePostClick = () => {
    deletePostMutation();
    closeModal();
  };
  return (
    <>
      <PageTitle title="게시물" />
      <ModalBackground onClick={closeModal}></ModalBackground>
      <AnimatePresence>
        <ModalCloseBtn key={"ModalCloseBtn"} onClick={closeModal}>
          x
        </ModalCloseBtn>
        <ModalBox
          variants={modalVariants}
          initial="start"
          animate="end"
          exit="exit"
        >
          <Modalheader>
            <h2>게시물</h2>
            {data?.seePost?.isMine ? (
              <DeletePost onClick={onDeletePostClick}>삭제</DeletePost>
            ) : null}
          </Modalheader>
          <ModalMain>
            <ModalPhoto>
              <Photo src={data?.seePost?.file} alt="" />
            </ModalPhoto>
            <ModalPostInfo>
              <UserInfoContainer>
                <Avatar lg url={data?.seePost?.user?.avatar} />
                <Username
                  size="16px"
                  textDecoration="none"
                  username={data?.seePost?.user?.username}
                />
              </UserInfoContainer>
              <PostCaption>{data?.seePost?.caption}</PostCaption>

              <Comments
                postId={data?.seePost?.id}
                commentsNumber={data?.seePost?.commentsNumber}
                comments={data?.seePost?.comments}
                openComments={"open"}
              />
            </ModalPostInfo>
          </ModalMain>
        </ModalBox>
      </AnimatePresence>
    </>
  );
};
export default ProfilePost;
