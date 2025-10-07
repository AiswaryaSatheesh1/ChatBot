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

  const showMainArea = messages.length === 0;

  return (
    <div className="chat-window">
      {showMainArea ? (
    
        <div className="main-area">
          {/* <div className="main-tip"> */}
            {/* <span className="tip-icon">⚡</span> */}
            {/* <span>
              <span className="tip-orange">Power up</span> your tools with full access
            </span> */}
          {/* </div> */}
         
          <h1 className="main-title">What's on your mind today?</h1>
          <div className="huge-input-container">
            <input
              type="text"
              placeholder="Ask Anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onInputKeyDown}
              className="main-input"
              autoFocus
            />
            <div className="main-addons">
              <button className="addon deeper-research">
                <span className="dr-icon">📑</span> Deeper Research
              </button>
              <button className="addon"><span>🖼️</span></button>
              <button className="addon"><span>💡</span></button>
            {/* </div> */}
            <div className="main-side-icons">
              <button className="side-btn"><span>⚙️</span></button>
              <button className="side-btn"><span>🌐</span></button>
              <button className="side-btn"><span>🔗</span></button>
              <button className="side-btn"><span>🎤</span></button>
              </div>
              <button onClick={handleSend} className="main-send-btn" aria-label="Send">
                <span style={{fontSize: "1.2em"}}>↑</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default ChatWindow;
