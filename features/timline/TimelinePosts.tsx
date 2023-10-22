import Post from "@/components/Post";
import axiosPrivate from "@/config/axios.config";
import { useQuery } from "react-query";

const TimelinePosts = () => {
  const { data, isLoading } = useQuery<Post[], Error>(
    "get-timeline-posts",
    async () => {
      try {
        const { data } = await axiosPrivate.get("post/timeline");
        return data;
      } catch (error) {
        throw new Error("Error while fetching timeline posts");
      }
    }
  );
  if (isLoading) return <div>loading...</div>;
  return (
    <div className="flex flex-col gap-5 mt-5">
      {data?.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default TimelinePosts;
