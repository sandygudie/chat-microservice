const express = require("express");
const { connectToDB } = require("./db/db");
const apiRouter = require("./routes");
const app = express();
http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config({ path: ".env.local" });
app.use(cors());
const server = http.createServer(app);
const { sendMessage, emojiReactions, editMessage ,deleteMessage} = require("./controllers");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
connectToDB();
app.use("/api/v1/chat", apiRouter);

io.on("connection", (socket) => {
  socket.on("send_message", (data) => {
    sendMessage(data)
      .then((res) => {
        socket.emit("messages", res);
      })
      .catch((err) => console.log(err));
  });
  socket.on("post_emoji", (data) => {
    emojiReactions(data)
      .then((res) => {
        socket.emit("messages", res);
      })
      .catch((err) => console.log(err));
  });
  socket.on("edit_post", (data) => {
    editMessage(data)
      .then((res) => {
        socket.emit("messages", res);
      })
      .catch((err) => console.log(err));
  });
  socket.on("delete_post", (data) => {
    deleteMessage(data)
      .then((res) => {
        socket.emit("messages", res);
      })
      .catch((err) => console.log(err));
  });
});

server.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
