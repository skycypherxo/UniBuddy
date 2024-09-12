const DashBoard = require('../models/dashboardModel');

const getDashBoardData = async (req, res) => {
    try{
        console.log("Inside Dashboard controller");
        const userId = req.user.id;
        const email = req.body.email;
        console.log(email, userId);
        const dashBoardData = await DashBoard.findOne({userId});
        console.log(dashBoardData);

        if(!dashBoardData){
            console.log("NO dashboard data");
            return res.status(401).json({message : "No dashboard data found "});
        }

        return res.status(200).json(dashBoardData);
    }
    catch(err){
        console.error("Error fetching dashBoard data : ", err);
        res.status(500).json({message : "Server error in dashBoard controller"});
    }
};


module.exports = getDashBoardData;