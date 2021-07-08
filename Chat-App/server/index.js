const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require('cors');


//import users.js functions
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");

const PORT = process.env.PORT || 5000; //server port 5000 de çalışacak

const router = require("./router"); //router.js den gelir

const app = express();
const server = http.createServer(app);

//if socket.io version > 3  for cors
corsOptions = {
    cors: true,
    origins: ["http://localhost:3000"],
}
const io = socketio(server, corsOptions); //socket.io server running
//io connects front-end and back-end(keyword=connection) -- io on the backend
//io.on connection , socket.on disconnection
//io = leave and join 

//**Socket.io
io.on("connection", (socket) => { //socket - parameter

    //chat.js den  name ve room
    //callback functions for error

    socket.on("join", ({ name, room }, callback) => {

        const { error, user } = addUser({ id: socket.id, name, room });
        if (error) return callback(error);

        //Chat.js de sendMessage function da socket.emit.(message) kullanılır
        socket.emit("message", { user: "admin", text: `${user.name},welcome to the room  ${user.room}` });

        //only one room ,not  all chats
        socket.broadcast.to(user.room).emit("message", { user: "admin", text: `${user.name} has joined!` });

        // another socket.io method
        socket.join(user.room);

        io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room) })

        callback();
    });

    //sendMessage , Chat.js de kullanılacak - useEffect hook u ile
    socket.on("sendMessage", (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit("message", { user: user.name, text: message }); //message come front end
        io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room) })

        callback();
    });

    socket.on("disconnect", () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });
            io.to(user.room).emit("roomData", { user: user.room, users: getUsersInRoom(user.room) }); io.to(user.room).emit("message", { user: "admin", text: `${user.name} has left` })
        }
    });
});

app.use(cors());
app.use(router); //app use router.js
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
