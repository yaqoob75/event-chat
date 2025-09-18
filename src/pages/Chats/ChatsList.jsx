import { useState } from "react";
import useHeader from "../../hooks/useHeader";
import { ChatSidebar, ChatArea, DirectorySidebar } from "../../components";
import { chatsData } from "../../constants/home";

export default function ChatApp() {
  useHeader({ isHeader: false });
  const [selectedChat, setSelectedChat] = useState(null);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const [chats, setChats] = useState(chatsData);

  const addMessage = (chatId, message) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  id: Date.now(),
                  sender: "You",
                  message,
                  time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                  isOwn: true,
                  avatar: "/young-man-avatar.png",
                },
              ],
              lastMessage: message,
              time: "now",
            }
          : chat
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      <ChatSidebar
        chats={chats}
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
      />

      <div className="flex-1 flex">
        <ChatArea
          selectedChat={selectedChat}
          onSendMessage={addMessage}
          onToggleDirectory={() => setIsDirectoryOpen(!isDirectoryOpen)}
          isDirectoryOpen={isDirectoryOpen}
        />

        {isDirectoryOpen && (
          <DirectorySidebar onClose={() => setIsDirectoryOpen(false)} />
        )}
      </div>
    </div>
  );
}
