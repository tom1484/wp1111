import mongoose from 'mongoose';


const MessageSchema = mongoose.Schema({
    name: String,
    subject: String,
    score: Number,
});
const Message = mongoose.model('User', MessageSchema);

export default Message;