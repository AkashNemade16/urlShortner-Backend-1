import mongoose from 'mongoose';


const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true,
    },
    short: {
        type: String,
        required: true,
    },
    shortenedUrl: {
        type: String,
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
    ownedBy: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        default: "Anonymous"
    },
}
)

const shortUrl = mongoose.model('shortUrl', shortUrlSchema);

export default shortUrl;