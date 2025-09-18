import { useState } from "react";
import { FiSearch, FiPlus, FiChevronDown } from "react-icons/fi";

const ChatSidebar = ({ chats, selectedChat, onSelectChat }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="h-20 p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-gray-900">Messages</h1>
            <FiChevronDown className="w-4 h-4 text-gray-500" />
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
              12
            </span>
          </div>
          <button
            type="button"
            className="w-8 h-8 bg-[#8FCFFF] rounded-full flex items-center justify-center"
          >
            <FiPlus className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="my-5 px-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:bg-white"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="px-4 flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={`p-4 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedChat?.id === chat.id ? "bg-blue-50 border-blue-200" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                {chat.isGroup && chat.members ? (
                  <div className="flex items-center">
                    {chat.members.slice(0, 3).map((member, index) => (
                      <img
                        key={index}
                        src={member.avatar || "/placeholder.svg"}
                        alt={member.name}
                        className={`w-9 h-9 rounded-full border-2 border-white -ml-5 first:ml-0`}
                      />
                    ))}
                    {chat.members.length > 3 && (
                      <div className="w-7 h-7 rounded-full bg-[#8FCFFF] text-black flex items-center justify-center text-sm -ml-5">
                        +{chat.members.length - 3}
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <img
                      src={chat.avatar || "/placeholder.svg"}
                      alt={chat.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    {/* {chat.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )} */}
                  </>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-gray-900 truncate">
                    {chat.name}
                  </h3>
                  <span className="text-xs text-gray-500">{chat.time}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
