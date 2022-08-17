import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io("https://free-real-time-chat.herokuapp.com");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      console.log(username);
      console.log(room);
      socket.emit("join_room", room);
      setShowChat(true);
    }
    return;
  };

  const exitRoom = () => {
    setShowChat(false);
    setUsername("");
    setRoom("");
  };

  return (
    <div className="App">
      <div className="filter">
        <div className="container">
          {!showChat ? (
            <div className="joinChatContainer">
              <h1>RealTime Chat</h1>
              <h3>チャットに参加しよう！</h3>
              <p>同じルーム番号の人とチャットができるよ</p>
              <input
                type="text"
                placeholder="お名前"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="text"
                placeholder="ルーム番号"
                onChange={(e) => setRoom(e.target.value)}
              />
              <button onClick={joinRoom}>ルームに参加</button>
            </div>
          ) : (
            <>
              <Chat
                socket={socket}
                username={username}
                room={room}
                setShowChat={setShowChat}
                showChat={showChat}
              />
              <button onClick={exitRoom} className="exit-button">
                ホームに戻る
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
