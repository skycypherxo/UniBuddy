//IMPORTS
//congif imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const body_parser = require('body-parser');
const cookie_parser = require('cookie-parser');
const app = express();
const session = require('express-session');
const PORT = 3000;
const {Server} = require('socket.io');
const http = require('http');





//--------------------ROUTES IMPORTS -----------------------------
//ash imports
const authRoutes = require('./routes/authRoutes');
const dashBoardRoutes = require('./routes/dashboardRoutes');
const eventRoutes = require('./routes/eventRoutes');
const productRoutes = require('./routes/productRoutes');
const roomRoutes = require('./routes/roomRoutes');
const codeRoutes = require('./routes/codeRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const queryRoutes = require('./routes/queryRoutes');

//shwets imports 








// END OF IMPORTS 
// config
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));


app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(cookie_parser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {secure : false} //true while deployingggggg
}));
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
    }
});


//db connection
mongoose.connect('mongodb://127.0.0.1:27017/UniBuddy').then(() => {
    console.log("Mongo connected to UniBuddy!");
}).catch((err) => {
    console.error("Error", err);
});



// ash routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashBoardRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/products', productRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/code', codeRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/llm', queryRoutes);




//shwets routes 










io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);
    });

    socket.on('draw', (data) => {
        const { roomId, startX, startY, x, y } = data;
        const drawData = { startX, startY, x, y }; 
    
        io.to(roomId).emit('draw', drawData);
    });
    socket.on('sendMessage', (message) => {
        const { roomId, text, userName } = message;
        io.to(roomId).emit('chatMessage', { text, userName });
    });


    
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

//start
server.listen(PORT, () => {
    console.log("Server listening on 3000");
})