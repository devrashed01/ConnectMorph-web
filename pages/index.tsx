import Chat from "@/features/chat";
import Friends from "@/features/friends";
import AddPost from "@/features/timline/AddPost";
import TimelinePosts from "@/features/timline/TimelinePosts";
import AuthLayout from "@/layouts/AuthLayout";
import Header from "@/layouts/Header";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <AuthLayout>
      <>
        <Header />
        <div className="flex gap-5 pt-[75px]">
          <div className="w-1/4"></div>
          <div className="w-2/4 border border-slate-500 rounded-xl p-5">
            <AddPost />
            <TimelinePosts />
          </div>
          <div className="w-1/4 flex flex-col gap-5 sticky top-[75px] overflow-auto h-[calc(100vh-75px)]">
            {/* <div className="border border-slate-500 rounded-xl h-64"></div> */}
            <Chat />
            <Friends />
          </div>
        </div>
      </>
    </AuthLayout>
  );
}
