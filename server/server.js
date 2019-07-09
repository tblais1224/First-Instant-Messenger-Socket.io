//refactor initiating http and express here
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const chalk = require("chalk");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const getVisitors = () => {
  //will be object of sockets
  let clients = io.sockets.clients().connected;
  //forms an array of all clients
  let sockets = Object.values(clients);
  //map out users from the sockets into an array
  let users = sockets.map(s => s.user);
  return users;
};

//send users to all sockets when conected
const emitVisitors = () => {
  io.emit("visitors", getVisitors());
};

io.on("connection", socket => {
  //fires when new user connects
  console.log(chalk.bgGreen.bold("A user connected to socket"));

  //get the user info when a new user connects
  socket.on("new_visitor", user => {
    console.log(
      chalk.bgBlue("new_visitor ==>", user.ip, user.country, user.city)
    );
    //binds socket to the user
    socket.user = user;
    emitVisitors();
  });

  //fires when user disconnects
  socket.on("disconnect", () => {
    //when disconnect update connected user list
    emitVisitors();
    console.log(chalk.bgYellow.bold("A user disconnected from socket"));
  });
});

const PORT = process.env.PORT || 5000;

//start express server
http.listen(PORT, () =>
  console.log(chalk.green(`Express server listening on port: ${PORT}`))
);
