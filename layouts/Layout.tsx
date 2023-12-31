import axiosPrivate from "@/config/axios.config";
import { AuthContext } from "@/context/AuthContext";
import { PropsWithChildren, useContext } from "react";
import { useQuery } from "react-query";
import ManNav from "./MainNav";

const Layout = ({ children }: PropsWithChildren) => {
  const { setUser } = useContext(AuthContext);
  const { data } = useQuery("user", () => axiosPrivate.get("/user"), {
    onSuccess: (data) => {
      console.log(data, "data");
      setUser(data.data);
    },
    onError: () => {
      setUser(undefined);
    },
  });

  if (!data) {
    return null;
  }
  return (
    <>
      <div className="mr-16 px-4">{children}</div>
      <ManNav />
    </>
  );
};

export default Layout;
