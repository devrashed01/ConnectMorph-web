import AuthLayout from "@/layouts/AuthLayout";
import Header from "@/layouts/Header";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <AuthLayout>
      <main className={`min-h-screen ${inter.className}`}>
        <Header />
      </main>
    </AuthLayout>
  );
}
