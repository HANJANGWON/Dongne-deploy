import Layout from "../../components/shared/Layout";
import { AnimatePresence } from "framer-motion";
import {
  useNavigate,
  NavigateFunction,
  PathMatch,
  useMatch,
  useParams,
} from "react-router-dom";
import UploadPost from "../UploadPost";
import PageTitle from "../../components/PageTitle";
import styled from "styled-components";
import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import basic_image from ".././/images/basic_user.jpeg";
import { Input } from "../../components/auth/Input";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import EDIT_PROFILE_MUTATION from "../../documents/mutations/editProfile.mutation";
import ME_QUERY from "../../documents/queries/me.query";
import { EditProfileFormError } from "../../components/auth/FormError";

interface FormData {
  fullName: string;
  username?: string;
  email: string;
  password: string;
  bio?: string;
  avatar: FileList;
  existUser?: string;
}

const Container = styled.section`
  margin-top: 130px;
  display: flex;
  justify-content: center;
  height: 100%;
`;
const Button = styled.button`
  border: none;
  outline: none;
  background-color: ${(props) => props.theme.accent};
  padding: 9px 20px;
  border-radius: 5px;
  color: white;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;

const EditProfileForm = styled.form`
  padding: 80px 75px;
  padding-top: 45px;
  max-width: 450px;
  width: 450px;
  background-color: ${(props) => props.theme.bgContainerColor};
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  label:first-child {
    display: flex;
    align-items: end;
    margin-bottom: 30px;
  }
  label {
    font-size: 14px;
    display: block;
    margin-bottom: 15px;
    color: ${(props) => props.theme.fontColor};
    span {
      margin-bottom: 5px;
      display: block;
    }
  }
  input {
    background-color: ${(props) => props.theme.inputBgColor};
  }
`;
const Avatar = styled.img`
  width: 100px;
  height: 100px;
  cursor: pointer;
  border-radius: 50%;
`;

const EditAvatarBtn = styled(Button).attrs({ as: "span" })`
  margin-left: 20px;
  color: ${(props) => props.theme.buttonFontColor};
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EditProfileBtn = styled(Button)`
  margin-left: 5px;
  background-color: ${(props) => props.theme.accent};
  color: ${(props) => props.theme.buttonFontColor};
`;
const DeleteAccountBtn = styled(Button)`
  margin-right: 5px;
  background-color: ${(props) => props.theme.deleteColor};
`;

const EditProfile = () => {
  const { username } = useParams();
  const navigate: NavigateFunction = useNavigate();
  const uploadPostPathMath: PathMatch<"username"> | null = useMatch(
    `/users/:username/edit/posts/upload`
  );
  const { data: userData } = useUser();

  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setError,
    clearErrors,
    formState: { isValid, errors },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      email: userData?.me?.email || "",
      fullName: userData?.me?.fullName || "",
      username: userData?.me?.username || username,
      password: userData?.me?.password || "",
      bio: userData?.me?.bio || "",
    },
  });
  const watchingAvatarFile: FileList = watch("avatar");
  const [editProfileMutation, { loading }] = useMutation(
    EDIT_PROFILE_MUTATION,
    {
      onCompleted: ({ editProfile: { ok, error } }) => {
        if (!ok) {
          return setError("existUser", {
            message: error,
          });
        }
        const { username } = getValues();
        navigate(`/users/${username}`);
      },

      refetchQueries: [{ query: ME_QUERY }],
    }
  );

  const onValid = () => {
    if (loading) {
      return;
    }
    const { email, fullName, username, password, bio, avatar } = getValues();
    editProfileMutation({
      variables: {
        email: email === "" ? undefined : email,
        fullName: fullName === "" ? undefined : fullName,
        username: username === "" ? undefined : username,
        password: password === "" ? undefined : password,
        bio: bio === "" ? undefined : bio,
        avatar: avatar ? avatar[0] : undefined,
      },
    });
  };

  useEffect(() => {
    if (watchingAvatarFile && watchingAvatarFile.length > 0) {
      const avatarFile: File = watchingAvatarFile[0];
      const objectUrl: string = URL.createObjectURL(avatarFile);
      setAvatarPreview(objectUrl);
    }
  }, [watchingAvatarFile]);

  return (
    <Layout>
      <AnimatePresence>{uploadPostPathMath && <UploadPost />}</AnimatePresence>
      <PageTitle title={"프로필 편집"} />
      <Container>
        <EditProfileForm
          onSubmit={handleSubmit(onValid)}
          method="POST"
          encType="multipart/form-data"
        >
          <label htmlFor="avatar">
            {avatarPreview === "" ? (
              <Avatar src={userData?.me?.avatar || basic_image} alt="" />
            ) : (
              <Avatar src={avatarPreview} alt="" />
            )}
            <EditAvatarBtn>프로필 사진 변경</EditAvatarBtn>
            <input
              {...register("avatar")}
              id="avatar"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
            />
          </label>
          <label htmlFor="email">
            <span>이메일</span>
            <Input
              {...register("email")}
              id="email"
              type="email"
              placeholder="이메일 주소"
            />
          </label>
          <label htmlFor="fullName">
            <span>이름</span>
            <Input
              {...register("fullName")}
              id="fullName"
              type="text"
              placeholder="이름"
            />
          </label>
          <label htmlFor="username">
            <span>아이디</span>
            <Input
              {...register("username", {
                onChange() {
                  clearErrors("existUser");
                },
              })}
              id="username"
              type="text"
              placeholder="아이디"
            />
          </label>
          <label htmlFor="password">
            <span>비밀번호</span>
            <Input
              {...register("password")}
              id="password"
              type="password"
              placeholder="비밀번호"
            />
          </label>
          <label htmlFor="bio">
            <span>상태</span>
            <Input
              {...register("bio")}
              id="bio"
              type="text"
              placeholder="자기소개"
            />
          </label>
          <ButtonContainer>
            <EditProfileBtn
              disabled={!isValid}
              onClick={handleSubmit(onValid)}
              type="submit"
            >
              프로필 수정
            </EditProfileBtn>
            <DeleteAccountBtn>계정 탈퇴</DeleteAccountBtn>
          </ButtonContainer>
          <EditProfileFormError message={errors?.existUser?.message} />
        </EditProfileForm>
      </Container>
    </Layout>
  );
};

export default EditProfile;
