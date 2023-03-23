import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { AnimatePresence, motion } from "framer-motion";
import {
  Link,
  NavigateFunction,
  PathMatch,
  useMatch,
  useParams,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../../components/shared/Avatar";
import Button from "../../components/shared/Button";
import Username from "../../components/shared/Username";
import SEE_FOLLOWERS_QUERY from "../../documents/queries/seeFollowers.query";
import FOLLOW_USER_MUTATION from "../../documents/mutations/followUser.mutation";
import basic_image from "../images/basic_user.jpeg";
import { ModalBackground, modalVariants, ScrollBox } from "../../shared/shared";
import SEE_FOLLOWING_QUERY from "../../documents/queries/seeFollowing.query";
import UNFOLLOW_USER_MUTATION from "../../documents/mutations/unfollowUser.mutation";

type FollwersParams = {
  username: string;
};

const ModalBox = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  box-sizing: border-box;
  outline: none;
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgContainerColor};
  overflow: hidden;
  z-index: 120;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  padding: 12px 0;
  h1 {
    font-weight: 600;
    font-size: 16px;
  }
  button {
    position: absolute;
    top: 5px;
    right: 4px;
    font-size: 22px;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: ${(props) => props.theme.bgContainerColor};
    color: ${(props) => props.theme.fontColor};
  }
`;

const ModalMain = styled(ScrollBox)`
  padding: 10px 18px;
  padding-bottom: 0;
  overflow-y: scroll;
  height: 355px;
`;

const ModalMainContent = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const ModalMainUser = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
  a {
    display: flex;
    align-items: center;
  }
`;

const ModalMainUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 13px;
`;

const FollowButton = styled(Button).attrs({
  as: "div",
})<{ isFollowing: boolean | undefined }>`
  width: 60px;
  height: 30px;
  text-align: center;
  background-color: ${(props) =>
    props.isFollowing === true ? "white" : props.theme.accent};
  color: ${(props) => (props.isFollowing === true ? "gray" : "white")};
  border: 1px solid
    ${(props) =>
      props.isFollowing === true ? props.theme.borderColor : "transparent"};
`;

const SeeFollow = () => {
  const client = useApolloClient();
  const followersPathMath: PathMatch<"username"> | null = useMatch(
    "/users/:username/followers"
  );
  const followingPathMath: PathMatch<"username"> | null = useMatch(
    "/users/:username/following"
  );

  const { username } = useParams<FollwersParams>();
  const navigate: NavigateFunction = useNavigate();
  const closeModal = (): void => {
    navigate(-1);
  };
  const { data: seeFollowersData } = useQuery(SEE_FOLLOWERS_QUERY, {
    variables: {
      username,
    },
  });

  const { data: seeFollowingData } = useQuery(SEE_FOLLOWING_QUERY, {
    variables: {
      username,
    },
  });

  const unfollowUserUpdate = (cache: any, result: any) => {
    const {
      data: {
        unfollowUser: { ok, user },
      },
    } = result;
    if (!ok) {
      return;
    }
    cache.modify({
      id: `User:${user?.username}`,
      fields: {
        isFollowing(prev: boolean) {
          return false;
        },
        totalFollowers(prev: number) {
          return prev - 1;
        },
      },
    });
    cache.modify({
      id: `User:${username}`,
      fields: {
        totalFollowing(prev: number) {
          return prev - 1;
        },
      },
    });
    const newUser = {
      __ref: `User:${user?.username}`,
    };
    cache.evict({
      id: "ROOT_QUERY",
      fields: {
        seeFollowing(prev: any) {
          return [newUser];
        },
      },
    });
  };

  const followUserCompleted = (data: any) => {
    const {
      followUser: { ok, user },
    } = data;
    if (!ok) {
      return;
    }
    const { cache } = client;
    cache.modify({
      id: `User:${user?.username}`,
      fields: {
        isFollowing(prev: boolean) {
          return true;
        },
        totalFollowers(prev: number) {
          return prev + 1;
        },
      },
    });
    cache.modify({
      id: `User:${username}`,
      fields: {
        totalFollowing(prev: number) {
          return prev + 1;
        },
      },
    });

    cache.modify({
      id: "ROOT_QUERY",
      fields: {
        seeFollowing(prev: any) {
          return;
        },
      },
    });
  };
  const [followUserMutation] = useMutation(FOLLOW_USER_MUTATION, {
    onCompleted: followUserCompleted,
  });

  const [unfollowUserMutation] = useMutation(UNFOLLOW_USER_MUTATION, {
    update: unfollowUserUpdate,
  });

  const toggleFollow = (
    isFollowing: boolean | undefined,
    username: string | undefined
  ): void => {
    if (isFollowing === false) {
      followUserMutation({ variables: { username: username as string } });
    } else if (isFollowing === true) {
      unfollowUserMutation({ variables: { username: username as string } });
    }
  };

  return (
    <AnimatePresence>
      <ModalBackground key={ModalBackground} onClick={closeModal} />
      <ModalBox
        key={ModalBox}
        variants={modalVariants}
        initial="start"
        animate="end"
        exit="exit"
      >
        <ModalHeader key={ModalHeader}>
          <h1>{followersPathMath ? "팔로워" : "팔로잉"}</h1>
          <button onClick={closeModal}>✕</button>
        </ModalHeader>
        <ModalMain>
          {followersPathMath &&
            seeFollowersData?.seeFollowers.followers?.map((follower: any) => (
              <ModalMainContent key={follower.id}>
                <ModalMainUser>
                  <Link to={`/users/${follower.username}`}>
                    <Avatar size="38px" url={follower?.avatar || basic_image} />
                    <ModalMainUserInfo>
                      <Username
                        size="15px"
                        username={follower?.username}
                        textDecoration={"true"}
                      />
                    </ModalMainUserInfo>
                  </Link>
                </ModalMainUser>
                {follower?.isMe === false && (
                  <FollowButton
                    isFollowing={follower?.isFollowing}
                    onClick={() =>
                      toggleFollow(follower?.isFollowing, follower?.username)
                    }
                    type="button"
                  >
                    {follower?.isFollowing === true ? "팔로잉" : "팔로우"}
                  </FollowButton>
                )}
              </ModalMainContent>
            ))}
          {followingPathMath &&
            seeFollowingData?.seeFollowing.following?.map((following: any) => (
              <ModalMainContent key={following.id}>
                <ModalMainUser>
                  <Link to={`/users/${following.username}`}>
                    <Avatar
                      size="38px"
                      url={following?.avatar || basic_image}
                    />
                    <ModalMainUserInfo>
                      <Username
                        size="15px"
                        username={following?.username}
                        textDecoration={"true"}
                      />
                    </ModalMainUserInfo>
                  </Link>
                </ModalMainUser>
                {following?.isMe === false && (
                  <FollowButton
                    isFollowing={following?.isFollowing}
                    onClick={() =>
                      toggleFollow(following?.isFollowing, following?.username)
                    }
                    type="button"
                  >
                    {following?.isFollowing === true ? "팔로잉" : "팔로우"}
                  </FollowButton>
                )}
              </ModalMainContent>
            ))}
        </ModalMain>
      </ModalBox>
    </AnimatePresence>
  );
};

export default SeeFollow;
