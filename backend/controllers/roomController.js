const {v4 : uuid} = require('uuid');

exports.createRoom  = async (req, res) => {
    const roomId = uuid();
    console.log("roomId", roomId);
    res.status(200).json(roomId);
};

exports.joinRoom = async(req, res) => {
    const {roomId} = req.body;
    if(!roomId){
        console.log("No room Id present");
        return res.status(400).json({message : "No valid room Id "});
    }
    res.status(200).json({message : "Joined Room"});
}