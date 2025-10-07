import React from "react";
import "./messageBubble.css";

interface Message {
  sender: "user" | "bot" | string;
  text: string;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <div className={`message-bubble ${message.sender}`}>
      <div className="message-content">{message.text}</div>
    </div>
  );
};

export default MessageBubble;
