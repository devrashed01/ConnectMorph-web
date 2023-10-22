type User = {
  _id: string;
  username: string;
  email: string;
  name: string;
  followers: string[];
  following: string[];
  notifications: string[];
  friends: string[];
  friendRequests: string[];
  chats: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  bio: string;
  location: string;
  avatar?: string;
};

type Post = {
  _id: string;
  author: {
    _id: string;
    username: string;
    name: string;
  };
  content: string;
  likes: string[];
  comments: string[];
  createdAt: string;
  __v: number;
};
