import React, { useState, useRef, useEffect } from "react";
import { Schoolbell } from "next/font/google";
import { motion } from "framer-motion";
import { useMultiplayer } from "../net/multiplayer";
import { Net } from "../net/net";
import { useGameContext } from "../GameContext";

// Load Schoolbell font
const schoolbell = Schoolbell({
  subsets: ["latin"],
  weight: "400"
});

const MessagingSection: React.FC<{ prompt: string; onSent: () => void }> = ({ prompt, onSent }) => {
  const [inputText, setInputText] = useState<string>("");
  // const [messages, setMessages] = useState<string[]>([]);
  const messages = [prompt];
  const [hasSentMessage, setHasSentMessage] = useState(false); // Track if the message has been sent
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxLength = 100;

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value.toUpperCase());
  };

  const mp = useMultiplayer();
  const game = useGameContext();

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;
    onSent();
    Net.Helpers.Client.submitResponse(mp, game.token, inputText);
    // setMessages([...messages, inputText]); // Add new message at the end
    setInputText(""); // Clear input field
    setHasSentMessage(true); // Disable input and button
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height after sending
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey && !hasSentMessage) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    // Dynamically adjust textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Adjust height
    }
  }, [inputText]);

  // Determine text color based on length
  const getTextColor = () => {
    if (inputText.length > 90) return "text-red-500";
    if (inputText.length > 70) return "text-yellow-500";
    return "text-black";
  };

  return (
    <div className="flex flex-col h-screen justify-end flex-grow items-center p-8 pb-20 bg-gray-100 rounded-lg shadow-lg max-w-sm mx-auto w-full space-y-4">
      {/* Display received/sent messages */}
      <div className="w-full space-y-2">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            animate={{
              rotate: [0.4, 1.3, -0.8, 1.6, -1.2, 1.8, -0.5, 0.9, -1.4, 0.6, 0.4] // Jiggle animation
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              delay: index * 0.1 // Stagger for randomness
            }}
            className={`relative ${
              index === messages.length - 1 && hasSentMessage ? "bg-blue-600 text-white" : "bg-white text-gray-700"
            } p-4 rounded-2xl shadow-[2px_8px_5px_rgba(0,0,0,0.6)] border-4 border-black ${schoolbell.className} text-lg uppercase mb-6`}
          >
            <div className="text-left">
              {/* Message text with sender's name and timestamp */}
              <div className="name text-sm font-semibold mb-2">
                <span className={`text-blue-600`}>User</span>
                <span className="text-gray-500">
                  {" "}
                  <small>at 10:10 AM</small>
                </span>
              </div>
              <div className="message text-base">{msg}</div>
            </div>

            {/* Bubble arrow (squiggly tail) */}
            <div
              className={`absolute ${
                index === messages.length - 1 && hasSentMessage ? "right-[-16px]" : "left-[-16px]"
              } bottom-[-8px] w-0 h-0 border-t-9 border-t-[#f5f5f5] border-l-9 border-r-9 border-transparent rounded-[0_20px_0_0] transform rotate-[145deg]`}
            />
          </motion.div>
        ))}
      </div>

      {/* Message Input Field */}
      <div className="flex items-end w-full">
        <textarea
          ref={textareaRef}
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // Send on Enter key press
          placeholder="TYPE YOUR MESSAGE HERE..."
          maxLength={maxLength}
          rows={1}
          disabled={hasSentMessage} // Disable after sending the first message
          className={`flex-grow p-4 text-lg border-4 border-black ${
            hasSentMessage ? "bg-gray-200 text-gray-500" : "bg-white"
          } rounded-2xl shadow-md focus:outline-none resize-none overflow-hidden ${schoolbell.className} ${getTextColor()} uppercase`}
          style={{
            minHeight: "50px",
            maxHeight: "200px",
            height: "auto"
          }}
        />
        <button
          onClick={handleSendMessage}
          disabled={hasSentMessage || messages[0] === ""} // Disable after sending the first message
          className={`ml-2 px-4 py-2 text-lg font-bold border-4 border-black rounded-2xl shadow-md transition ${
            hasSentMessage || messages[0] === ""
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 active:bg-gray-100"
          }`}
        >
          ➤
        </button>
      </div>

      {/* Character Counter */}
      <div className="text-sm text-gray-500 self-end">
        {inputText.length}/{maxLength}
      </div>
    </div>
  );
};

export default MessagingSection;
