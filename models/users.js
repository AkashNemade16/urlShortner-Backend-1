import mongoose from 'mongoose';


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,

    },
    password: {
        type: String,
        unique: true,
        required: true,
    },
    register_date: {
        type: Date,
        default: Date.now
    }
})
const userData = mongoose.model('user', userSchema);
export default userData