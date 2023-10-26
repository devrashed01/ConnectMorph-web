import axiosPrivate from "@/config/axios.config";
import { assetUrl } from "@/utils/url";
import { useMutation, useQuery, useQueryClient } from "react-query";

const Requests = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery<
    {
      data: {
        message?: string;
        data?: Fiends[];
      };
    },
    Error
  >("friend-requests", () => axiosPrivate.get("/user/friend-requests"));

  const { mutate } = useMutation(
    (id: string) => axiosPrivate.post(`user/accept/${id}`),
    {
      onMutate: (id) => {
        const button = document.getElementById(`${id}-accept-friend`);
        if (button) {
          button.innerHTML = "Accepting...";
        }
      },
      onSuccess: (data, id) => {
        const button = document.getElementById(`${id}-accept-friend`);
        if (button) {
          button.innerHTML = "Accepted";
        }
        queryClient.invalidateQueries("you-may-knows");
        queryClient.invalidateQueries("friends");
      },
      onError: (error, id) => {
        const button = document.getElementById(`${id}-accept-friend`);
        if (button) {
          button.innerHTML = "Accept";
        }
      },
    }
  );

  return (
    <div className="p-5">
      <h3 className="mb-3">Requests:</h3>
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
              id={`${friend._id}-accept-friend`}
              onClick={() => mutate(friend._id)}
              className="ml-auto px-3 py-1 bg-primary-bg text-xs rounded-md"
            >
              Accept
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
