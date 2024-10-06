import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RoomJoin = () => {
  const [roomId, setRoomId] = useState('');
  const [createdRoomId, setCreatedRoomId] = useState('');
  const [joinRoomId, setJoinRoomId] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/rooms/create');
      console.log("Room Id : ", response.data);
      setCreatedRoomId(response.data);
    } catch (error) {
      console.error('Error creating room', error);
    }
  };

  const handleJoinRoom = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/rooms/join', { roomId: joinRoomId });
      if (response.status === 200) {
        navigate(`/room/${joinRoomId}`);
      }
    } catch (error) {
      console.error('Error joining room', error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(createdRoomId).then(() => {
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000); 
    }, () => {
      setCopySuccess('Failed to copy');
    });
  };

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Create Room</h2>
        <button
          onClick={handleCreateRoom}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Create Room
        </button>
        {createdRoomId && (
          <div className="mt-4 flex items-center space-x-4">
            <p>
              Room created! Room ID: <span className="font-bold">{createdRoomId}</span>
            </p>
            <button
              onClick={copyToClipboard}
              className="bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Copy
            </button>
          </div>
        )}
        {copySuccess && <p className="text-green-500 mt-2">{copySuccess}</p>}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-bold mb-4">Join Room</h2>
        <input
          type="text"
          value={joinRoomId}
          onChange={(e) => setJoinRoomId(e.target.value)}
          placeholder="Enter Room ID"
          className="border border-gray-300 p-2 rounded-lg w-full"
        />
        <button
          onClick={handleJoinRoom}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mt-4"
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default RoomJoin;
