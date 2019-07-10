const mongoose = require("mongoose")
Schema = mongoose.Schema
//Our conversation schema will essentially just hold the participants of the conversation and generate an ID for the conversation.
const ConversationSchema = new Schema({
    participants : [{
        type: Schema.types.ObjectId,
        ref: "User"
    }]
})

module.exports = mongoose.model("Conversation", ConversationSchema)