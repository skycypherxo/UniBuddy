//IMPORTS


//congif imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const body_parser = require('body-parser');
const cookie_parser = require('cookie-parser');
const app = express();

//routes imports
const authRoutes = require('./routes/authRoutes');
const dashBoardRoutes = require('./routes/dashboardRoutes');

const session = require('express-session');
const PORT = 3000;



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

//db
mongoose.connect('mongodb://127.0.0.1:27017/UniBuddy').then(() => {
    console.log("Mongo connected!");
}).catch((err) => {
    console.error("Error", err);
});

//routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashBoardRoutes);

//start
app.listen(PORT, () => {
    console.log("Server listening on 3000");
})