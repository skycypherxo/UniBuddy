import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import WhiteBoard from './WhiteBoard';
import './RoomPage.css'  

const socket = io('http://localhost:3000');  

const RoomPage = () => {
  const { roomId } = useParams();
  const userName = "YourUserName";
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit('joinRoom', roomId);

    socket.on('chatMessage', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const sendMessage = () => {
    if (message.trim()) {
      const chatMessage = { text: message, roomId };
      socket.emit('sendMessage', chatMessage);
      console.log(chatMessage.text);
      setMessage('');
    }
  };

  return (
    <div className="room-page">
      <h1>Welcome to Room {roomId}</h1>

      <div className="chat-container">
        <div className="chat-window">
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>
                <strong>{msg.text}</strong>

              </li>
            ))}
          </ul>
        </div>

        <div className="chat-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>

      <WhiteBoard roomId={roomId} />
    </div>
  );
};

export default RoomPage;
