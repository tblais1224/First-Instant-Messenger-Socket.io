//refactor initiating http and express here
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const chalk = require("chalk");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


io.on("connection", socket => {
  //fires when new user connects
  console.log(chalk.bgGreen.bold("A user connected to RoomChat socket"));

  socket.on("join_room", room => {
     socket.join(room) 
  })

  socket.on("message", data => {
      // message, room will be in data
      const {room, message} = data

      //send message and name to all connecting sockets in the room
      socket.to(room).emit("message", {
          message,
          "name": "Friend"
      })
  })

  socket.on("typing", (data) => {
      const {room} = data
      //send if someone is typing to all rooms connecting sockets
      socket.to(room).emit("typing", "Someone is typing")
  })

  socket.on("stopped_typing", (data) => {
      const {room} = data
      socket.to(room).emit("typing", "stopped_typing")
  })
});

const PORT = process.env.PORT || 5001;

//start express server
http.listen(PORT, () =>
  console.log(chalk.green(`Room Chat server listening on port: ${PORT}`))
);
