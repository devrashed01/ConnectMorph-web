import axiosPrivate from "@/config/axios.config";
import { assetUrl } from "@/utils/url";
import { useMutation, useQuery } from "react-query";

const YouMayKnow = () => {
  const { data } = useQuery<
    {
      data: {
        message?: string;
        data?: Fiends[];
      };
    },
    Error
  >("you-may-knows", () => axiosPrivate.get("/user/you-may-know"));

  const { mutate } = useMutation(
    (id: string) => axiosPrivate.post(`user/request/${id}`),
    {
      onMutate: (id) => {
        const button = document.getElementById(`${id}-add-friend`);
        if (button) {
          button.innerHTML = "Sending...";
        }
      },
      onSuccess: (data, id) => {
        const button = document.getElementById(`${id}-add-friend`);
        if (button) {
          button.innerHTML = "Request Sent";
        }
      },
      onError: (error, id) => {
        const button = document.getElementById(`${id}-add-friend`);
        if (button) {
          button.innerHTML = "Add Friend";
        }
      },
    }
  );

  return (
    <div className="p-5">
      <h3 className="mb-3">You May Know:</h3>
      <p>{data?.data.message}</p>
      <div>
        {data?.data?.data?.map((friend) => (
          <div
            className="flex items-center py-3 gap-3 text-sm"
            key={friend._id}
          >
            <img
              className="h-9 w-9 rounded-full"
              src={assetUrl + friend.avatar}
              alt=""
            />{" "}
            {friend.username}
            <button
              id={`${friend._id}-add-friend`}
              onClick={() => mutate(friend._id)}
              className="ml-auto px-3 py-1 bg-primary-bg text-xs rounded-md"
            >
              Add Friend
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouMayKnow;
