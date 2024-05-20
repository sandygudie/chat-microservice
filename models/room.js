const { Schema, model } = require("mongoose");

const roomSchema = Schema(
  {
    roomId: String,
    chats: [
      {
        type: Schema.Types.ObjectId,
        ref: "Chat",
      },
    ],
  },
  { timestamps: true },
  {
    collection: "room",
  }
);

module.exports = model("Room", roomSchema);
