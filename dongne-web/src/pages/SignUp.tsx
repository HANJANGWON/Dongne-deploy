import { useMutation } from "@apollo/client";
import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/shared/Button";
import FormBox from "../components/auth/FormBox";
import { SignUpFormError } from "../components/auth/FormError";
import { Input } from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import { HeaderContainer, SubTitle } from "../components/shared/shared";
import routes from "../routes";
import CREATE_ACCOUNT_MUTATION from "../documents/mutations/createAccount.mutation";

const FontAwesome = styled.div`
  color: ${(props) => props.theme.accent};
`;

const SignUp = () => {
  const navigate = useNavigate();
  const onCompleted = (data: any) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok },
    } = data;
    if (!ok) {
      return;
    }
    navigate(routes.home, {
      state: {
        message: "회원가입이 성공적으로 완료되었습니다.",
        username,
        password,
      },
    });
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, formState, getValues } = useForm({
    mode: "onChange",
  });
  const onSubmitValid = (data: any) => {
    if (loading) {
      return;
    }
    const { username, fullName, email, password } = data;
    createAccount({
      variables: {
        username,
        fullName,
        email,
        password,
      },
    });
  };
  return (
    <AuthLayout>
      <PageTitle title="회원가입" />
      <FormBox>
        <HeaderContainer>
          <FontAwesome>
            <FontAwesomeIcon icon={faBuilding} size="3x" />
          </FontAwesome>
          <SubTitle>동네를 이용하고 싶다면 가입하세요.</SubTitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)} autoComplete="off">
          <Input
            {...register("username", {
              required: "아이디를 입력해 주세요.",
            })}
            name="username"
            type="text"
            placeholder="아이디"
          />
          <Input
            {...register("password", {
              required: "비밀번호를 입력해 주세요.",
            })}
            name="password"
            type="password"
            placeholder="비밀번호"
          />
          <Input
            {...register("fullName", {
              required: "이름을 입력해 주세요.",
            })}
            name="fullName"
            type="text"
            placeholder="이름"
          />
          <Input
            {...register("email", {
              required: "이메일을 입력해 주세요.",
            })}
            name="email"
            type="text"
            placeholder="이메일"
          />
          <Button
            type="submit"
            value={loading ? "로딩중..." : "가입"}
            disabled={!formState.isValid || loading}
          />
        </form>
        <SignUpFormError
          message={
            formState.errors?.username?.message ||
            formState.errors?.password?.message ||
            formState.errors?.fullName?.message ||
            formState.errors?.email?.message
          }
        />
      </FormBox>
      <BottomBox
        cta="계정이 있으신가요?"
        linkText="로그인"
        link={routes.home}
      />
    </AuthLayout>
  );
};

export default SignUp;
