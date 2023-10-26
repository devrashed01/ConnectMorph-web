import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed w-[calc(100%-64px)] top-0 right-16 z-50 bg-darkest-bg border-b border-[#333] text-white flex justify-between items-center px-4 py-3">
      <div className="flex items-center">
        <h1 className="text-lg font-bold">ConnectMorph</h1>
      </div>
      <div className="ml-auto">
        <Link href="/profile" className="mr-3">
          Profile
        </Link>
        <Link href="/" className="mr-3">
          Home
        </Link>
        <input
          type="text"
          placeholder="Search"
          className="w-96 max-w-full bg-gray-800 text-white rounded-full px-4 py-2 focus:outline-none focus:shadow-outline"
        />
      </div>
    </header>
  );
};

export default Header;
