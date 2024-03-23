import React, { useState } from "react";
import { Send, Paperclip, Image } from "lucide-react";

function MessageInput({ onSendMessage, onFileAttach }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return; // Prevent sending empty messages
    onSendMessage(message);
    setMessage(""); // Clear input after sending
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      onFileAttach(e.target.files); // Handle file attachment
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-4 px-3 py-1 m-4 bg-white border rounded-lg"
    >
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 p-2 rounded-lg "
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <label htmlFor="file-input" className="cursor-pointer">
        <Paperclip size={24} />
        <input
          id="file-input"
          type="file"
          multiple
          hidden
          onChange={handleFileChange}
        />
      </label>
      <label htmlFor="image-input" className="cursor-pointer">
        <Image size={24} />
        <input
          id="image-input"
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={handleFileChange}
        />
      </label>
      <button type="submit" className="p-2 rounded-lg">
        <Send size={24} />
      </button>
    </form>
  );
}

export default MessageInput;
