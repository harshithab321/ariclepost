const Article=require('./artical');
const mongoose=require('mongoose');

const articleLikeSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User'
    },
    articleId: {
        type: String,
        required: true,
        ref: 'Article'
    },
    likedAt: {
        type: Date,
        default: Date.now
    }
});

const ArticleLike = mongoose.model('ArticleLike', articleLikeSchema);
module.exports = ArticleLike;
