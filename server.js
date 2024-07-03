const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Socket.IO event handling 
io.on("connection", function (socket) {
    socket.on("newuser", function (username) {
        socket.broadcast.emit("update", username + " joined the conversation");
    });
    socket.on("exituser", function (username) {
        socket.broadcast.emit("update", username + " left the conversation");
    });
    socket.on("chat", function (message) {
        socket.broadcast.emit("chat", message);
    });
});

const PORT = process.env.PORT || 3087; // Use port 3087 if not provided
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
