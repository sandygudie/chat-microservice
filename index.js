require("dotenv").config({ path: ".env.local" });
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { connectToDB } = require("./db/db");
const apiRouter = require("./routes");


app.use(cors());

const server = http.createServer(app);
const {
  sendMessage,
  emojiReactions,
  editMessage,
  deleteMessage,
} = require("./controllers");

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true
  },
});

connectToDB();

app.get("/", (req, res) =>
  res.status(200).send({ message: "Welcome to Chat Microservice!." })
);

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
