const { Schema, model } = require("mongoose");

const chatSchema = Schema(
  {
    roomId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
   isEdited: {
      type: Boolean,
    },
    createdBy: {
      id: String,
      name: String,
      profilePics: String,
      email: String,
    },
    emojiReactions: {
      type: Array,
    },
    replyTo: { type: Schema.Types.ObjectId, ref: "Chat" },
  },
  { timestamps: true },

  {
    collection: "chat",
  }
);

module.exports = model("Chat", chatSchema);
