const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dislikeSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    videoId: {
        type: String,
    }

})


const Dislike = mongoose.model('Dislike', dislikeSchema);

module.exports = { Dislike }
