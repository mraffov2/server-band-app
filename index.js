const express = require("express");
const path = require("path");
require("dotenv").config();

//APP de express
const app = express();

// NODE server
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);

require("./sockets/sockets");

//PATH publico
const publicPath = path.resolve(__dirname, "public");

app.use(express.static(publicPath));

server.listen(process.env.PORT, (err) => {
  if (err) throw new Error(err);

  console.log(`App listening on por ${process.env.PORT} `);
});
