import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const WhiteBoard = ({ roomId }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pencil'); 
  const [color, setColor] = useState('#000000'); 
  const [lineWidth, setLineWidth] = useState(5); 
  const [users, setUsers] = useState([]);

  const throttle = (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 800;
    canvas.height = 600;
    canvas.style.border = '1px solid black';

    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    contextRef.current = context;

    socket.on('draw', (data) => {
      const { startX, startY, x, y } = data;
      drawOnCanvas(startX, startY, x, y, false);
    });

    socket.emit('joinRoom', roomId);

    return () => {
      socket.disconnect();
    };
  }, [roomId, color, lineWidth]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setIsDrawing(true);
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.startX = offsetX;
    contextRef.current.startY = offsetY;
  };

  const draw = throttle(({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    if (tool === 'pencil') {
      drawOnCanvas(contextRef.current.startX, contextRef.current.startY, offsetX, offsetY, true);
    } else if (tool === 'eraser') {
      contextRef.current.strokeStyle = '#ffffff'; 
      contextRef.current.lineWidth = lineWidth + 10; 
      drawOnCanvas(contextRef.current.startX, contextRef.current.startY, offsetX, offsetY, true);
    }
  }, 10);

  const stopDrawing = () => {
    setIsDrawing(false);
    contextRef.current.closePath();
  };

  const drawOnCanvas = (startX, startY, x, y, emit) => {
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
    if (emit) {
      const data = {
        startX,
        startY,
        x,
        y,
        roomId,
      };
      socket.emit('draw', data);
    }
  };

  const drawShape = (shape) => {
    const context = contextRef.current;
    context.closePath();
    if (shape === 'rect') {
      context.strokeRect(context.startX, context.startY, 100, 100); 
    } else if (shape === 'circle') {
      context.beginPath();
      context.arc(context.startX, context.startY, 50, 0, Math.PI * 2); 
      context.stroke();
    } else if (shape === 'line') {
      context.lineTo(200, 200); 
      context.stroke();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="whiteboard-container">
      <h3>Room: {roomId}</h3>
      {/* <p>Users in this room: {users.length}</p> */}
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>

      <div className="toolbar">
        <button onClick={() => setTool('pencil')}>Pencil</button>
        <button onClick={() => setTool('eraser')}>Eraser</button>
        <button onClick={() => drawShape('rect')}>Rectangle</button>
        <button onClick={() => drawShape('circle')}>Circle</button>
        <button onClick={() => drawShape('line')}>Line</button>

        <label>Color: </label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <label>Line Width: </label>
        <input
          type="range"
          min="1"
          max="20"
          value={lineWidth}
          onChange={(e) => setLineWidth(e.target.value)}
        />

        <button onClick={clearCanvas}>Clear Canvas</button>
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        width={800}
        height={600}
      />
    </div>
  );
};

export default WhiteBoard;
