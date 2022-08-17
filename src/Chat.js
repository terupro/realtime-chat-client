import React, { useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import ChatIcon from "@mui/icons-material/Chat";
import { v4 as uuidv4 } from "uuid";

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (currentMessage !== "") {
      const messageData = {
        message: currentMessage,
        author: username,
        room: room,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList([...messageList, messageData]);
      setCurrentMessage("");
    }
  };

  socket.on("receive_message", (data) => {
    console.log(data);
    setMessageList([...messageList, data]);
  });

  return (
    <div className="chat-window">
      <div className="chat-wrapper"></div>
      <div className="chat-header">
        <ChatIcon className="icon" />
        <p>チャット</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, index) => (
            <div
              key={uuidv4()}
              className="message"
              id={username == messageContent.author ? "you" : "other"}
            >
              <div className="message-wrapper">
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                  <p id="author">{messageContent.author}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollToBottom>
      </div>

      <form onSubmit={sendMessage} className="chat-footer">
        <input
          type="text"
          placeholder="メッセージ内容"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button>&#9658;</button>
      </form>
    </div>
  );
};

export default Chat;
