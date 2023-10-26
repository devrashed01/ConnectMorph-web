import cookie from "js-cookie";
import { useState } from "react";
import { useMutation } from "react-query";

import Input from "@/components/Input";
import AuthLayout from "@/layouts/AuthLayout";
import Link from "next/link";
import toast from "react-hot-toast";
import axiosPrivate from "../config/axios.config";

const Login = () => {
  const [state, setState] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    name: "",
    email: "",
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
      name: string;
      email: string;
      password: string;
    }
  >((payload) => axiosPrivate.post("/auth/register", payload), {
    onSuccess: (data) => {
      cookie.set("access_token", data?.data?.token);
      window.location.href = "/";
    },
    onError: (error: any) => {
      const errors = error?.response?.data?.errors;
      if (errors) {
        const errObj = {} as any;
        errors.forEach((el: { path: string; msg: string }) => {
          errObj[el.path] = el.msg;
        });

        setErrors(errObj);
      }
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(state);
  };

  return (
    <AuthLayout
      title="Register"
      footerContent={
        <p className="mt-4 text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-gray-300">
            Login
          </Link>
        </p>
      }
    >
      <form
        className="relative z-10 flex flex-col gap-5 items-center justify-center w-full max-w-sm"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <Input
          name="name"
          placeholder="Name"
          value={state.name}
          onChange={changeHandler}
          helperText={errors.name}
        />
        <Input
          name="username"
          placeholder="Username"
          value={state.username}
          onChange={changeHandler}
          helperText={errors.username}
        />
        <Input
          name="email"
          type="email"
          placeholder="email"
          value={state.email}
          onChange={changeHandler}
          helperText={errors.email}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={changeHandler}
          helperText={errors.password}
        />
        <button
          className="w-32 ml-auto h-11 px-4 text-white bg-darkest-bg rounded-[5px]"
          type="submit"
        >
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;
