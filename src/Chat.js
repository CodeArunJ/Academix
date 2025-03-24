// components/Chat.js

import React, { useState, useEffect } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Example: Fetch messages from a backend or use a WebSocket for real-time chat
    // For simplicity, we initialize with dummy data
    setMessages([
      { id: 1, text: "Hello!", sender: "user" },
      { id: 2, text: "Hi there!", sender: "admin" },
    ]);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user", // Assuming user sends messages
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender === "user" ? "user" : "admin"}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
