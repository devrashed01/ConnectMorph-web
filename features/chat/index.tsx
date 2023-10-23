import cookie from "js-cookie";
import React, { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

interface Message {
  id: number;
  text: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const token = cookie.get("access_token");
    const newSocket = io("http://localhost:5000", {
      auth: { token },
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("message", (message: Message) => {
        console.log("message", message);
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      socket.on("connect", () => {
        console.log("connected");
      });

      socket.on("disconnect", () => {
        console.log("disconnected");
      });

      socket.on("connect_error", (err) => {
        console.log("connect_error", err);
      });

      socket.on("connect_timeout", (err) => {
        console.log("connect_timeout", err);
      });

      socket.on("error", (err) => {
        console.log("error", err);
      });

      socket.on("reconnect", (attemptNumber) => {
        console.log("reconnect", attemptNumber);
      });

      socket.on("reconnect_attempt", (attemptNumber) => {
        console.log("reconnect_attempt", attemptNumber);
      });

      socket.on("reconnecting", (attemptNumber) => {
        console.log("reconnecting", attemptNumber);
      });

      socket.on("reconnect_error", (err) => {
        console.log("reconnect_error", err);
      });

      socket.on("reconnect_failed", () => {
        console.log("reconnect_failed");
      });

      socket.on("ping", () => {
        console.log("ping");
      });

      socket.on("pong", (latency) => {
        console.log("pong", latency);
      });
    }
  }, [socket]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputValue.trim(),
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
      if (socket) {
        socket.emit("message", inputValue.trim());
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl text-black font-bold mb-4">Chat</h1>
      <div className="mb-4">
        {messages.map((message) => (
          <div className="text-slate-800" key={message.id}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-gray-700 font-bold mb-2"
          >
            Message
          </label>
          <input
            type="text"
            id="message"
            name="message"
            value={inputValue}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
