import { PropsWithChildren } from "react";

type Props = {
  title: string;
  footerContent?: React.ReactElement;
};

const AuthLayout = ({
  children,
  title,
  footerContent,
}: PropsWithChildren<Props>) => {
  return (
    <div className="flex flex-col py-12 items-center justify-center min-h-screen">
      <div className="w-96 border border-[rgba(255,255,255,0.05)] rounded-xl p-6 pt-20">
        <h2 className="mb-20 text-2xl font-semibold text-gray-300 text-center title-text-shadow">
          {title}
        </h2>
        {children}
      </div>
      {footerContent && footerContent}
    </div>
  );
};

export default AuthLayout;
