import { useState, useRef, useEffect } from "react";
import { FiSend, FiPaperclip, FiFolder } from "react-icons/fi";
import { BsFillSendFill } from "react-icons/bs";
import { MdAttachFile } from "react-icons/md";

const ChatArea = ({
  selectedChat,
  onSendMessage,
  onToggleDirectory,
  isDirectoryOpen,
}) => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat?.messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && selectedChat) {
      onSendMessage(selectedChat.id, message.trim());
      setMessage("");
    }
  };

  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <FiFolder className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No chat selected
          </h3>
          <p className="text-gray-500">
            Choose a conversation from the sidebar to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white max-h-[100dvh] overflow-y-auto">
      {/* Chat Header */}
      <div className="h-20 p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={selectedChat.avatar || "/placeholder.svg"}
                alt={selectedChat.name}
                className="w-10 h-10 rounded-lg object-cover"
              />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">
                {selectedChat.name}
              </h2>
              <div className="flex items-center gap-1">
                {selectedChat.isOnline && (
                  <>
                    <div className=" w-3 h-3 bg-green-500 rounded-full"></div>
                    <p className="text-sm font-semibold">Online</p>
                  </>
                )}
              </div>
            </div>
          </div>
          {!isDirectoryOpen && (
            <button
              onClick={onToggleDirectory}
              type="button"
              className={`p-2 rounded-full cursor-pointer transition-colors ${
                !isDirectoryOpen ? "bg-[#8FCFFF]" : ""
              }`}
            >
              <MdAttachFile className="w-6 h-6 hover:text-gray-700" />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {selectedChat.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex items-end gap-2 max-w-xs lg:max-w-md ${
                msg.isOwn ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {msg && (
                <div className="flex flex-col items-center">
                  <img
                    src={
                      msg.avatar || selectedChat.avatar || "/placeholder.svg"
                    }
                    alt={msg.sender}
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                  {selectedChat.isGroup && (
                    <span className="text-xs text-gray-500 mt-1">
                      {msg.sender}
                    </span>
                  )}
                </div>
              )}
              <div
                className={`px-4 py-2 rounded-2xl ${
                  msg.isOwn
                    ? "bg-[#8FCFFF] text-gray-900 rounded-br-sm"
                    : "bg-gray-100 text-gray-900 rounded-bl-sm"
                }`}
              >
                <p className="text-sm">{msg.message}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiPaperclip className="w-5 h-5" />
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
              className="w-full px-4 py-4 rounded-lg text-sm text-gray-700 placeholder-gray-400 border-2 border-[#E2E8F0] focus:outline-none focus:ring-1 focus:ring-gray-300 pr-12"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <BsFillSendFill className="w-6 h-6 text-[#8FCFFF]" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;
