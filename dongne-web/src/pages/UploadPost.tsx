import styled from "styled-components";
import PageTitle from "../components/PageTitle";
import { AnimatePresence, motion } from "framer-motion";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { BiImageAdd } from "react-icons/bi";
import { useForm } from "react-hook-form";
import useUser from "../hooks/useUser";
import Avatar from "../components/shared/Avatar";
import Username from "../components/shared/Username";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import UPLOAD_POST_MUTATION from "../documents/mutations/uploadPost.mutation";
import routes from "../routes";
import { ModalBackground, modalVariants } from "../shared/shared";

interface FormData {
  photo: FileList;
  text: string;
}

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

const ModalBox = styled(motion.form)`
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

  button {
    position: absolute;
    right: 10px;
    text-align: center;
    padding: 8px 2px;
    cursor: pointer;
    font-weight: 600;
    border: none;
    background-color: transparent;
    color: ${(porps) => porps.theme.accent};
  }
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

const PhotoPreview = styled.img`
  width: 100%;
`;

const FileInput = styled.input`
  display: none;
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

const PhotoCaption = styled.textarea`
  background-color: ${(props) => props.theme.bgContainerColor};
  color: ${(props) => props.theme.fontColor};
  margin-top: 10px;
  resize: none;
  outline: none;
  border: none;
  width: 100%;
  height: 600px;
  font-size: 15px;
  line-height: 1.5;
`;

const UploadPost = () => {
  const { data: userData } = useUser();
  const updateUploadPost = (cache: any, result: any) => {
    const {
      data: { uploadPost },
    } = result;
    if (uploadPost.id) {
      const newPost = {
        __ref: `Post:${uploadPost.id}`,
      };

      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeFeed(prev: any) {
            return [newPost, ...prev];
          },
        },
      });
      cache.modify({
        id: `User:${userData?.me?.username}`,
        fields: {
          posts(prev: any) {
            return [uploadPost, ...prev];
          },
        },
      });
    }
  };

  const navigate: NavigateFunction = useNavigate();
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const { register, handleSubmit, getValues, watch } = useForm<FormData>({
    defaultValues: { text: "" },
  });
  const watchingPhotoFile: FileList = watch("photo");

  const [uploadPostMutation, { loading }] = useMutation(UPLOAD_POST_MUTATION, {
    update: updateUploadPost,
  });
  const closeModal = (): void => {
    navigate(-1);
  };

  const onValid = () => {
    if (loading === true) {
      return;
    }
    const { photo, text }: FormData = getValues();
    if (photoPreview) {
      uploadPostMutation({ variables: { file: photo[0], caption: text } });
      navigate(routes.home);
    }
  };

  useEffect(() => {
    if (watchingPhotoFile && watchingPhotoFile.length > 0) {
      const photoFile: File = watchingPhotoFile[0];
      const objectUrl: string = URL.createObjectURL(photoFile);
      setPhotoPreview(objectUrl);
    }
  }, [watchingPhotoFile]);

  return (
    <>
      <PageTitle title="새 게시물 만들기" />
      <ModalBackground></ModalBackground>
      <AnimatePresence>
        <ModalCloseBtn key={"ModalCloseBtn"} onClick={closeModal}>
          x
        </ModalCloseBtn>
        <ModalBox
          onSubmit={handleSubmit(onValid)}
          variants={modalVariants}
          initial="start"
          animate="end"
          exit="exit"
        >
          <Modalheader>
            <h2>새 게시물 만들기</h2>
            <button type="submit" onClick={handleSubmit(onValid)}>
              공유하기
            </button>
          </Modalheader>
          <ModalMain>
            <ModalPhoto>
              {photoPreview === "" ? (
                <label id="file">
                  <BiImageAdd size={80} />
                  <h3>사진 업로드</h3>
                  <FileInput
                    {...register("photo")}
                    type="file"
                    accept="image/*"
                    id="file"
                    required
                  />
                </label>
              ) : (
                <PhotoPreview src={photoPreview} alt="" />
              )}
            </ModalPhoto>
            <ModalPostInfo>
              <UserInfoContainer>
                <Avatar lg url={userData?.me?.avatar} />
                <Username
                  size="16px"
                  textDecoration="none"
                  username={userData?.me?.username}
                />
              </UserInfoContainer>
              <PhotoCaption
                {...register("text", {
                  required: "글을 입력해주세요...",
                })}
                placeholder="글을 입력해주세요..."
              />
            </ModalPostInfo>
          </ModalMain>
        </ModalBox>
      </AnimatePresence>
    </>
  );
};

export default UploadPost;
