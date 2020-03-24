const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


const server = require("http").createServer(app);
const io = require("socket.io")(server);

const config = require("./config/key");



//ربط الخادم بقاعدة البيانات 
const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));



app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cookieParser());

const { User } = require("./models/user");
const { Chat } = require("./models/Chat");
const { Room } = require("./models/room");
const { auth } = require("./middleware/auth");

app.use('/api/users', require('./routes/users'));


app.use('/api/chat', require('./routes/chat'));



//انشاء ملف في السيرفر لحفظ الصور 
const multer = require("multer");
const fs = require("fs");

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
})

var upload = multer({ storage: storage }).single("file")

app.post("/api/chat/uploadfiles", auth, (req, res) => {

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, url: res.req.file.path });
    })
});



io.on("connection", socket => {
    socket.on("Input Chat Message", msg => {
        connect.then(async db => {
            try {
                console.log(msg);
                let tmp = { message: msg.chatMessage, sender: msg.userId, type: msg.type, receiver: msg.user };
                let chat = new Chat(tmp);
                const alreadyInRoom = await Room.find({
                    users: {
                        $all: [msg.userId, msg.user]
                    }
                });
                console.log(alreadyInRoom);
                chat.save((err, doc) => {
                    console.log(doc)
                    if (err) return res.json({ success: false, err })
                    io.to(alreadyInRoom[0]._id).emit("Output Chat Message", tmp);
                    // Chat.find({ "_id": doc._id })
                    //     .populate("sender")
                    //     .exec((err, doc) => {

                    //         return io.emit("Output Chat Message", doc);
                    //     })
                })
            } catch (error) {
                console.error(error);
            }
        })
    });
    socket.on("CreateRoom", async data => {
        console.log(data);
        const alreadyInRoom = await Room.find({
            users: {
                $all: [data.server, data.client]
            }
        });

        if (alreadyInRoom.length) {
            io.in(alreadyInRoom[0]._id).clients((error, clients) => {
                // if user is not inside the room yet
                console.log(clients);
                if (clients.every(x => String(x) !== String(socket.id))) {
                    socket.join(alreadyInRoom[0]._id);
                }
            });
        } else {
            const newRoom = new Room({ users: [data.server, data.client] });
            await newRoom.save();

            socket.join(newRoom._id);
        }
    })
})



app.use('/uploads', express.static('uploads'));


if (process.env.NODE_ENV === "production") {


    app.use(express.static("client/build"));


    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
}

//تشغيل الخادم على port:5000
const port = process.env.PORT || 5000

server.listen(port, () => {
    console.log(`Server Running at ${port}`)
});