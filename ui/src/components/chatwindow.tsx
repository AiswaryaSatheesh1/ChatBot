import React from "react";
import MessageBubble from "./messagebubble";
import "./chatwindow.css";

interface Message {
  sender: "user" | "bot" | string;
  text: string;
}

interface ChatWindowProps {
  messages: Message[];
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSend: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  input,
  setInput,
  handleSend,
  messagesEndRef,
}) => {
  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        handleSend();
      }
    }
  };

  return (
    <div className="chat-window">
      <div className="messages-list">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onInputKeyDown}
          className="input-box"
          autoFocus
        />
        <button onClick={handleSend} className="send-btn" aria-label="Send message">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
