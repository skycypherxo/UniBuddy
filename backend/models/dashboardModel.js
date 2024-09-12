const mongoose = require('mongoose');

const dashBoardSchema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId , ref: 'User', required : true},
    course : {type : String , required : true},
    dob : {type : Date , required : true},
    contact : {type : Number , required : true},
    email : { type : String , required : true},
    address : {type : String , required : true},
    attendance : [
        {
            subject : {type : String , required : true},
            totalClasses : {type : String , required : true},
            attendedClasses : {type : String , required : true},
            percentage : {type : Number , required : true},
            last24Hours : {type : String , required : true}
        }
    ],

    timetable : [
    {
        time : {type : String , required : true},
        roomNo : {type : Number , required : true },
        subject : {type : String , required : true}
    }
    ],

    announcements : [
        {
            category : {type : String , required : true},
            message : {type : String , required : true},
            time : {type : String , required : true}
        }
    ],

    teachersOnLeave : [
        {
            name : {type : String , required : true},
            leaveType : {type : String , required : true}
        }
    ]
}, {timestamps : true});


const DashBoard = mongoose.model('DashBoard', dashBoardSchema);

module.exports = DashBoard;