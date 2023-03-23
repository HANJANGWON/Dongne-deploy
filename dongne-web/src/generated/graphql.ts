export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;

export type User = {
  __typename?: "User";
  id: number;
  username: string;
  email: string;
  fullName: string;
  createdAt: string;
  updatedAt: string;
  bio?: Maybe<string>;
  avatar?: Maybe<string>;
  posts?: Maybe<Array<Maybe<Post>>>;
  following?: Maybe<Array<Maybe<User>>>;
  followers?: Maybe<Array<Maybe<User>>>;
  totalFollowing: number;
  totalFollowers: number;
  isMe: boolean;
  isFollowing: boolean;
  isManager?: boolean;
};

export type Post = {
  __typename?: "Post";
  id: number;
  user: User;
  file: string;
  caption: string;
  dongtags?: Maybe<Array<Maybe<Dongtag>>>;
  likes: number;
  commentsNumber: number;
  comments: Maybe<Array<Maybe<Comment>>>;
  createdAt: string;
  updatedAt: string;
  isMine: boolean;
  isLiked: boolean;
};

export type Comment = {
  __typename?: "Comment";
  id: number;
  user: User;
  post: Post;
  payload: string;
  isMine: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Dongtag = {
  __typename?: "Dongtag";
  id: number;
  dongtag: string;
  posts?: Maybe<Array<Maybe<Post>>>;
  totalPosts: number;
  createdAt: string;
  updatedAt: string;
};
