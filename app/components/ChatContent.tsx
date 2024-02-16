"use client"
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { RealtimeChannel } from "@supabase/supabase-js";

interface Message {
  content: string;
  from: string;
}

const ChatContent = () => {
  const [channel, setChannel] = useState<RealtimeChannel>();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setName(name);
    }
  }, []);

  useEffect(() => {
    if (name) {
      const channel = supabase.channel(`room:a`, {
        config: {
          broadcast: {
            self: true,
          },
        },
      });

      channel.on("broadcast", { event: "message" }, ({ payload }) => {
        setMessages((prev) => [...prev, payload]);
      });

      channel.subscribe();

      setChannel(channel);

      return () => {
        channel.unsubscribe();
        setChannel(undefined);
      };
    }
  }, [name]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (channel) {
      await channel.send({
        type: "broadcast",
        event: "message",
        payload: { content: message, from: name },
      });
    }
    setMessage("");
  };

  return (
    <div className="flex flex-col justify-between h-full gap-4">
      <h1 className="text-center">Welcome to the Chat Room,<br /><span className="font-bold">{name}</span></h1>
      <div className="flex flex-col h-[70%] overflow-auto gap-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${
              message.from === name ? "self-start" : "self-end"
            } rounded bg-cus-purple p-2 max-w-[80%] break-words flex flex-col`}
          >
            <h1 className={`${
              message.from === name ? "self-start" : "self-end"
            } font-bold text-sm text-gray-400`}>{message.from}</h1>
            <p className="max-w-full break-words">{message.content}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="flex flex-col gap-2">
        <input
          className="p-2 rounded outline-none bg-gray-300 text-black placeholder-gray-500"
          type="text"
          placeholder="Enter your message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button
          type="submit"
          className="p-2 rounded bg-text-gradient hover:opacity-90 text-center"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ChatContent;
