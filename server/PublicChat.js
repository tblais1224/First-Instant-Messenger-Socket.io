//refactor initiating http and express here
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const chalk = require("chalk");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const getOnlineUsers = () => {
  //will be object of sockets
  let clients = io.sockets.clients().connected;
  //forms an array of all clients
  let sockets = Object.values(clients);
  //map out users from the sockets into an array
  let users = sockets.map(s => s.user);
  return users.filter(val => val !== undefined);
};

io.on("connection", socket => {
  //fires when new user connects
  console.log(chalk.bgGreen.bold("A user connected to PublicChat socket"));

  const emitOnlineUsers = () => {
    //emits user event to other sockets
    socket.broadcast.emit("users", getOnlineUsers());
  };

  socket.on("add_user", user => {
    //send message to connecting user when connecting
    socket.emit("server_message", {
      name: "TBlais Code",
      message: "Welcome to Tom's chat app."
    });
    //send to all connected sockets
    socket.broadcast.emit("server_message", {
      name: "TBlais Code",
      message: `${user.name} has joined the chat room.`
    });

    socket.user = user;
    emitOnlineUsers();
  });

  socket.on("disconnect", () => {
    const { user } = socket;
    //make sure user is not undefined
    if (user) {
      socket.broadcast.emit("server_message", {
        name: "TBlais Code",
        message: `${user.name} has left the chat room.`
      });
    }
    //check users again after someone disconnects
    emitOnlineUsers();
  });
});

const PORT = process.env.PORT || 5002;

//start express server
http.listen(PORT, () =>
  console.log(chalk.green(`Public Chat server listening on port: ${PORT}`))
);
