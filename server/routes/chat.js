const express = require('express');
const router = express.Router();
const { Chat } = require("../models/Chat");

router.post("/getChats", async(req, res) => {
    let res1 = await Chat.find({ sender: req.body.server, receiver: req.body.client })
        .select("-_id")
        // .populate("sender")
        .exec();
    let res2 = await Chat.find({ sender: req.body.client, receiver: req.body.server }).select("-_id").exec();
    res.status(200).json([...res1, ...res2]);
});

module.exports = router;

// (err, chats) => {
//     console.log(chats)
//     if (err) return res.status(400).json(err);
//     res.status(200).json(chats)
// }