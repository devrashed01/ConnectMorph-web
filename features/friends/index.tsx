import axiosPrivate from "@/config/axios.config";
import { assetUrl } from "@/utils/url";
import { useQuery } from "react-query";

const Friends = () => {
  const { data } = useQuery<
    {
      data: {
        message?: string;
        friends?: Fiends[];
      };
    },
    Error
  >("friends", () => axiosPrivate.get("/user/friends"));

  console.log(data, "friends");
  return (
    <div>
      Friends:
      <p>{data?.data.message}</p>
      {data?.data.friends?.map((friend) => (
        <p className="flex items-center gap-5" key={friend._id}>
          <img
            className="h-12 w-12 rounded-full"
            src={assetUrl + friend.avatar}
            alt=""
          />{" "}
          {friend.username}
        </p>
      ))}
    </div>
  );
};

export default Friends;
