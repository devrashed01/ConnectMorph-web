import { PropsWithChildren } from "react";

type Post = {
  author: {
    name: string;
  };
  content: string;
};

const Post = ({ post }: PropsWithChildren<{ post: Post }>) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center">
        <img
          className="w-10 h-10 rounded-full mr-4"
          src="https://via.placeholder.com/150"
          alt="Profile"
        />
        <div>
          <p className="font-medium text-gray-800">{post.author.name}</p>
          <p className="text-gray-600 text-sm">
            Posted on {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-800">{post.content}</p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button className="text-gray-600 hover:text-blue-600">
          <svg
            className="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21.707 2.293a1 1 0 0 0-1.414 0L8 14.586V17h2.414l12.293-12.293a1 1 0 0 0 0-1.414zM6 17V7.414L16.586 18H7a1 1 0 0 1-1-1z" />
          </svg>
          <span className="ml-2">Like</span>
        </button>
        <button className="text-gray-600 hover:text-blue-600">
          <svg
            className="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21.707 2.293a1 1 0 0 0-1.414 0L8 14.586V17h2.414l12.293-12.293a1 1 0 0 0 0-1.414zM6 17V7.414L16.586 18H7a1 1 0 0 1-1-1z" />
          </svg>
          <span className="ml-2">Comment</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
