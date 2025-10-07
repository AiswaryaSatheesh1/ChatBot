import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Sidebar from "./sidebar";
import ChatWindow from "./chatwindow";
import "./Chat.css";

interface Message {
  sender: string;
  text: string;
}

interface ChatItem {
  id: number;
  title: string;
  messages: Message[];
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [currentChat, setCurrentChat] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post("http://127.0.0.1:8000/chat", { message: input });
      const botReply = res.data.reply || "No response from server";
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Something went wrong. Please try again." },
      ]);
    }
    setInput("");
  };

  const startNewChat = () => {
    const newChatId = chats.length + 1;
    const newChat = { id: newChatId, title: `Chat ${newChatId}`, messages };
    setChats([...chats, newChat]);
    setCurrentChat(newChatId);
    setMessages([]);
  };

  const selectChat = (chatId: number) => {
    const chat = chats.find((c) => c.id === chatId);
    if (chat) {
      setCurrentChat(chatId);
      setMessages(chat.messages);
    }
  };

  return (
    <div className="app-container">
      <div className="sd" style={{ width: isSidebarOpen ? "260px" : "60px", transition: "width 0.3s" }}>
        <Sidebar
          chats={chats}
          currentChat={currentChat}
          onSelectChat={selectChat}
          onNewChat={startNewChat}
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      </div>
      <div className="cw">
        <ChatWindow
          messages={messages}
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          messagesEndRef={messagesEndRef}
        />
      </div>
    </div>
  );
};

export default Chat;
