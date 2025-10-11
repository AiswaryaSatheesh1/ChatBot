import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Sidebar from "./sidebar";
import ChatWindow from "./chatwindow";
import "./Chat.css";

// Get the logged-in user email from localStorage (set after login)
const userId = localStorage.getItem('userEmail') || "";

interface Message {
  sender: string;
  text: string;
}

interface ChatItem {
  id: number;
  title: string;
  messages: Message[];
}

const saveChat = async (chat: ChatItem, userId: string) => {
  if (!userId) return;
  try {
    await axios.post("http://127.0.0.1:8000/save_chat", {
      userId,
      title: chat.title,
      messages: chat.messages,
    });
  } catch (err) {
    console.warn("Could not save chat:", err);
  }
};

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

  // Load chats for the current user when the app loads
  useEffect(() => {
    async function fetchChats() {
      if (!userId) return;
      try {
        const res = await axios.get(`http://127.0.0.1:8000/user_chats/${userId}`);
        console.log("Loaded chats:", res.data); // Debug: see the chats loaded
        setChats(res.data);
        // Optionally auto-select the first chat
        if (res.data.length > 0) {
          setCurrentChat(res.data[0].id || 1);
          setMessages(res.data[0].messages || []);
        }
      } catch (err) {
        console.warn("Could not load chats:", err);
      }
    }
    fetchChats();
  }, [userId]); // Listen for userId changes just in case

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    let updatedChats = chats;
    let chatId = currentChat;
    if (chatId !== null) {
      updatedChats = chats.map((c) =>
        c.id === chatId ? { ...c, messages: updatedMessages } : c
      );
      setChats(updatedChats);
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/chat", { message: input });
      const botReply = res.data.reply || "No response from server";
      const finalMessages = [...updatedMessages, { sender: "bot", text: botReply }];
      setMessages(finalMessages);

      if (chatId !== null) {
        updatedChats = chats.map((c) =>
          c.id === chatId ? { ...c, messages: finalMessages } : c
        );
        setChats(updatedChats);
        await saveChat({ id: chatId, title: `Chat ${chatId}`, messages: finalMessages }, userId);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Something went wrong. Please try again." },
      ]);
    }
    setInput("");
  };

  const startNewChat = async () => {
    const newChatId = chats.length + 1;
    const newChat = { id: newChatId, title: `Chat ${newChatId}`, messages: [] };
    setChats([...chats, newChat]);
    setCurrentChat(newChatId);
    setMessages([]);
    await saveChat(newChat, userId); // Save new chat for user
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
