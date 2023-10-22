import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // await login(email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-4 text-4xl font-bold text-gray-800">Login</h1>
      <form
        className="flex flex-col items-center justify-center w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full px-4 py-2 mb-4 text-gray-700 bg-gray-200 border-2 border-gray-200 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 mb-4 text-gray-700 bg-gray-200 border-2 border-gray-200 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-400"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;