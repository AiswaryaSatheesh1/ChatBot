import React from "react";
import "./Sidebar.css";

interface Message { sender: string; text: string; }
interface ChatItem { id: number; title: string; messages: Message[];}
interface SidebarProps {
  chats: ChatItem[];
  currentChat: number | null;
  onSelectChat: (id: number) => void;
  onNewChat: () => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  chats, currentChat, onSelectChat, onNewChat, isOpen, toggleSidebar,
}) => {
  return (
    <div className={`sidebar${isOpen ? "" : " collapsed"}`}>
      <div className={`sidebar${isOpen ? "" : " collapsed"}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Toggle sidebar">
        {isOpen ? "⇤" : "⇥"}
      </button>
      <button className="new-chat-btn" onClick={onNewChat}>+</button>
      <div className="chat-list">
        {chats.length === 0 ? (
          <p style={{ color: "#9ca3af", padding: "16px" }}>No chats yet</p>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${currentChat === chat.id ? "active" : ""}`}
              onClick={() => onSelectChat(chat.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") onSelectChat(chat.id);} }
            >
              {chat.title}
            </div>
          ))
        )}
      </div >
      </div>
      
      
      
    </div>
  );
};
export default Sidebar;
