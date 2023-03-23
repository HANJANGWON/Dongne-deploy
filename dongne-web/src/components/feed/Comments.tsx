import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import CREATE_COMMENT_MUTATION from "../../documents/mutations/createComment.mutation";
import { Comment } from "../../generated/graphql";
import useUser from "../../hooks/useUser";
import CommentContainer from "./Comment";

interface CommentsContainerProps {
  postId: number;
  commentsNumber: number;
  comments: Comment[];
  openComments?: string;
}

const CommentsContainer = styled.div`
  padding-left: 15px;
`;

const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0px;
  display: block;
  font-weight: 600;
  font-size: 13px;
`;

const PostCommentContainer = styled.div`
  margin-top: 10px;
  padding-top: 15px;
  padding-bottom: 10px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;
const PostCommentInput = styled.input`
  width: 100%;
  &::placeholder {
    font-size: 12px;
  }
`;

const Comments = ({
  postId,
  commentsNumber,
  comments,
  openComments,
}: CommentsContainerProps) => {
  const { data: userData } = useUser();
  const { register, handleSubmit, setValue, getValues } = useForm();
  const createCommentUpdate = (cache: any, result: any) => {
    const { payload }: any = getValues();
    setValue("payload", "");
    const {
      data: {
        createComment: { ok, id },
      },
    } = result;

    if (ok && userData?.me) {
      const newComment = {
        __typename: "Comment",
        createdAt: Date.now() + "",
        id,
        isMine: true,
        payload,
        user: {
          ...userData.me,
        },
      };
      const newCacheComment = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment BSName on Comment {
            id
            createdAt
            isMine
            payload
            user {
              username
              avatar
            }
          }
        `,
      });

      cache.modify({
        id: `Post:${postId}`,
        fields: {
          comments(prev: any) {
            return [...prev, newCacheComment];
          },
          commentsNumber(prev: number) {
            return prev + 1;
          },
        },
      });
    }
  };
  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      update: createCommentUpdate,
    }
  );
  const onVaild = (data: any) => {
    const { payload } = data;
    if (loading) {
      return;
    }
    createCommentMutation({
      variables: {
        postId,
        payload,
      },
    });
  };
  return (
    <CommentsContainer>
      <CommentCount>{`댓글 ${commentsNumber}`}</CommentCount>
      {openComments ? (
        <div>
          {comments?.map((comment) => (
            <CommentContainer
              key={comment.id}
              id={comment.id}
              postId={postId}
              user={comment.user.username}
              payload={comment.payload}
              isMine={comment.isMine}
            />
          ))}
          <PostCommentContainer>
            <form onSubmit={handleSubmit(onVaild)}>
              <PostCommentInput
                {...register("payload", { required: true })}
                name="payload"
                type="text"
                placeholder="댓글을 입력해주세요..."
              />
            </form>
          </PostCommentContainer>
        </div>
      ) : null}
    </CommentsContainer>
  );
};

export default Comments;
