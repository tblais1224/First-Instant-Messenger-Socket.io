const express = require("express")
const router = express.Router()
const auth = require("../../middleware/auth");
const {
    check,
    validationResult
} = require("express-validator");
const Message = require("../../models/Message")
const Conversation = require("../../models/Conversation")
const User = require("../../models/User")

//@route GET api/chatroom/conversation
//@desc  Register User
//@access  Public
router.get("/conversation", auth, async (req, res) => {
    try {
        
    } catch (error) {

    }
})