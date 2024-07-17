

const mongoose=require('mongoose');

const articleViewSchema = new mongoose.Schema({
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
    viewedAt: {
        type: Date,
        default: Date.now
    }
});

const ArticleView = mongoose.model('ArticleView', articleViewSchema);
module.exports = ArticleView;
