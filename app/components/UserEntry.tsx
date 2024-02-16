"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const EntryComponent = () => {
  const [name, setName] = useState("");
  const router = useRouter();

  const enterChatRoom = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("name", name);
    router.push(`/live-stage/a`);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={enterChatRoom}>
        <input
          className="p-2 rounded outline-none bg-gray-700 text-white text-center"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button 
          type="submit"
          className="p-2 rounded bg-text-gradient hover:opacity-90 text-center"
        >
          Join Chat
        </button>
    </form>
  );
};

export default EntryComponent;
