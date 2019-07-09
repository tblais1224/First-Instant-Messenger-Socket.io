//refactor initiating http and express here
const app = require("express")();
const http = require("http").createServer(app)
const io = require("socket.io")(http)
const chalk = require("chalk")

app.get("/", (req,res) => {
  res.sendFile(__dirname + "/index.html")
})

io.on("connection", socket => {
  //fires when new user connects
  console.log(chalk.bgBlue("A user connected to socket"))
  //fires when user disconnects
  socket.on("disconnect", () =>
  console.log(chalk.bgYellow.bold("A user disconnected from socket")))
})

const PORT = process.env.PORT || 5000;

//start express server
http.listen(PORT, () => console.log(chalk.green(`Express server listening on port: ${PORT}`)))