const mongoose = require('mongoose');

const dashBoardSchema = new mongoose.Schema({
    userId : {type : String , required : true},
    course : {type : String , required : true},
    dob : {type : Date , required : true},
    contact : {type : Number , required : true},
    email : { type : String , required : true},
    address : {type : String , required : true},
    attendance : [
        {
            subject : {type : String , required : true},
            totalClasses : {type : Number , required : true},
            attendedClasses : {type : Number , required : true},
            percentage : {type : Number , required : true},
            lastUpdated : {type : String , required : true} // Changed from last24Hours to lastUpdated
        }
    ],

    timetable : [
    {
        time : {type : String , required : true},
        roomNo : {type : String , required : true },
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
            leaveType : {type : String , required : true} // Changed from leaveDuration to leaveType
        }
    ]
}, {timestamps : true});


const DashBoard = mongoose.model('DashBoard', dashBoardSchema);

module.exports = DashBoard;