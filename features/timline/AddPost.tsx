import axiosPrivate from "@/config/axios.config";
import React, { useState } from "react";
import { useMutation } from "react-query";

const AddPost = () => {
  const [content, setContent] = useState("");

  const { mutate } = useMutation(
    (content: string) => axiosPrivate.post("post", { content }),
    {
      onSuccess: () => {
        setContent("");
      },
    }
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(content);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
          Content
        </label>
        <input
          type="text"
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </form>
  );
};

export default AddPost;
