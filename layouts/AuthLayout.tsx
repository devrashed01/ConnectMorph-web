import { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-96 border border-[#232323] rounded-xl p-6 pt-10">
        <h2 className="mb-10 text-2xl font-semibold text-gray-300 text-center title-text-shadow">
          Login
        </h2>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
