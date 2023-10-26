import cookie from "js-cookie";
import { useState } from "react";
import { useMutation } from "react-query";

import Input from "@/components/Input";
import AuthLayout from "@/layouts/AuthLayout";
import toast from "react-hot-toast";
import axiosPrivate from "../config/axios.config";

const Login = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { mutate, isLoading } = useMutation<
    {
      data: {
        token: string;
        message: string;
      };
    },
    Error,
    {
      username: string;
      password: string;
    }
  >((payload) => axiosPrivate.post("/auth/login", payload), {
    onSuccess: (data) => {
      cookie.set("access_token", data?.data?.token);
      window.location.href = "/";
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(state);
  };

  return (
    <AuthLayout>
      <form
        className="relative z-10 flex flex-col items-center justify-center w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <Input
          placeholder="Username"
          value={state.username}
          onChange={changeHandler}
        />
        <Input
          type="password"
          placeholder="Password"
          value={state.password}
          onChange={changeHandler}
        />
        <button
          className="w-32 ml-auto h-11 px-4 text-white bg-darkest-bg rounded-[5px]"
          type="submit"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;
