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
      className="flex items-center gap-4 px-4 py-1 m-4 bg-white rounded-lg"
    >
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 p-2 rounded-lg focus:outline-none bg-white" // Example to remove the focus outline and change the border to a light gray
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      {/* <label
        htmlFor="file-input"
        className="m-2 h-4 w-4 shrink-0 opacity-50 cursor-pointer"
      >
        <Paperclip/>
        <input
          id="file-input"
          type="file"
          multiple
          hidden
          onChange={handleFileChange}
        />
      </label> */}
      <label
        htmlFor="image-input"
        className="m-2 h-4 w-4 shrink-0 opacity-50 cursor-pointer"
      >
        <Image />
        <input
          id="image-input"
          type="file"
          accept="image/*"
          
          hidden
          onChange={handleFileChange}
        />
      </label>
      <button
        type="submit"
        className="m-2 h-4 w-4 shrink-0 opacity-50 cursor-pointer"
      >
        <Send />
      </button>
    </form>
  );
}

export default MessageInput;
