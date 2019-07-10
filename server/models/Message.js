const mongoose = require("mongoose");
Schema = mongoose.Schema;

//use seperate collection for messages instead of storing in an array for better performance
const MessageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true //Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
  }
);

module.exports = mongoose.model("Message", MessageSchema);
