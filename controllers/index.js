const Chat = require("../models/chat");
const Room = require("../models/room");

const sendMessage = async (data) => {
  try {
    const { taskId, message, createdBy, replyId } = data;
    const newChat = await Chat.create({
      message,
      createdBy,
      roomId: taskId,
      replyTo: replyId,
    });
    const room = await Room.findOne({ roomId: taskId }).populate({
      path: "chats",
      populate: {
        path: "replyTo",
      },
    });
    if (room === null) {
      const newRoom = await new Room({ roomId: taskId });
      await newRoom.chats.push(newChat);
      await newRoom.save();
    } else {
      room.chats = room.chats.concat(newChat);
      await room.save();
    }
    return newChat;
  } catch (error) {
    console.log(error);
  }
};

const getMessages = async (req, res) => {
  try {
    const room = await Room.findOne({ roomId: req.params.taskId }).populate({
      path: "chats",
      populate: {
        path: "replyTo",
      },
    });
    res.status(200).json({ message: "Chat messages retrieved", chats: room });
  } catch (error) {
    res.status(400).json({ err: error });
  }
};

const emojiReactions = async (data) => {
  const { postId, reactions } = data;
  try {
    const chat = await Chat.findOne({ _id: postId });
    chat.emojiReactions = reactions;
    await chat.save();
    return chat;
  } catch (error) {
    console.log(error);
  }
};

const editMessage = async (editedPost) => {
  try {
    const chat = await Chat.findByIdAndUpdate(
      editedPost._id,
      { ...editedPost, isEdited: true },
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );
    return chat;
  } catch (error) {
    console.log(error);
  }
};
// const updatedBoard = await Board.findByIdAndDelete(boardId)
const deleteMessage = async (postId) => {
  try {
   await Chat.findByIdAndDelete(postId);
    return "Post deleted";
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendMessage,
  getMessages,
  emojiReactions,
  editMessage,
  deleteMessage,
};

// clean up
// validation
// trim
