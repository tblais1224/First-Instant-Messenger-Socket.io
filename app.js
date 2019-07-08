const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const chalk = require("chalk")


//routes
const index = require("./routes/index");

const app = express();
//test route   http://localhost:5000/
app.use(index);

const server = http.createServer(app);

// initialize a new instance by passing in the server object
const io = socketIo(server);

//takes the socket as an argument
const getApiAndEmit = async socket => {
    try {
        //enter the api key to get the data
        const res = await axios.get("https://api.darksky.net/forecast/f75d34e630f28985c412b0c45597bacb/37.8267,-122.4233")
        //send new message through socket
        //this calls the locations current temp and updates every 10 seconds
        socket.emit("FromAPI", res.data.currently.temperature)
    } catch (error) {
        console.log(chalk.red("Error:" + error))
    }
};

const PORT = process.env.PORT || 5000;

//create interval so each connection uses its own interval instance
let interval;
//setup the socket to update every 10seconds
io.on("connection", socket => {
  console.log(chalk.green('New client has connected to socket.'));
  //create a new interval for each new connection
  if (interval) {
    clearInterval(interval);
  }
  //set the interval for the socket to update to 10 seconds
  interval = setInterval(() => getApiAndEmit(socket), 10000)
  socket.on("disconnect", () => {
      console.log(chalk.yellow('Client has disconnected from socket.'))
  })
});


//start express server
server.listen(PORT, () => console.log(chalk.green(`Express server listening on port: ${PORT}`)))