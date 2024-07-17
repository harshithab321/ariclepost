

const express = require('express');
const router = express.Router();
const Article = require('../model/artical');
const ArticleLike = require('../model/liked');
const User = require('../model/users');
const ArticleView = require('../model/views');
// Corrected path
const redisclient=require('./redis')

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'harshitha.b225@gmail.com',
        pass: 'vrvc hyxj burd xpgl'
    }
});
console.log('Sending email to:');

function sendEmail(to, subject, text) {
    const mailOptions = {
        from: 'harshitha.b225@gmail.com',
        to: "starshub95@gmail.com",
        subject: "liked your post",
        text: "increase the likes by posting more"
    };
    console.log('Sending email to:');
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}




router.post('/article', async (req, res) => {
    const { articleId, title, author, body, numberOfLikes, numberOfViews } = req.body;

    try {
        const article = new Article({
            articleId,
            title,
            author,
            body,
            numberOfLikes,
            numberOfViews,
        });

        await article.save();
        res.status(201).send('Article saved successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/user', async (req, res) => {
    const { userid, userName } = req.body;

    try {
        const user = new User({
            userid,
            userName,
        });

        await user.save();
        res.status(201).send('User saved successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/articleliked', async (req, res) => {
    const { userId, articleId } = req.body;

    try {
        const newLike = new ArticleLike({
            userId,
            articleId,
        });

        await newLike.save();
        const response = await redisclient.zIncrBy('article_likes', 1, articleId.toString());
        console.log('ZINCRBY response:', response);

        try {
            await sendEmail('starshub95@gmail.com', 'Article View Incremented', `The view count for article ${articleId} has been incremented.`);
            res.status(200).send('Article liked successfully');
        } catch (emailError) {
            console.error('Error sending email:', emailError);
            res.status(500).send('Error sending email');
        }
    } catch (redisError) {
        console.error('Redis ZINCRBY error:', redisError);
        res.status(500).send('Error incrementing article likes');
    }
});
       

       

router.post('/views', async (req, res) => {
    const { userId, articleId } = req.body;

    try {
        const newView = new ArticleView({
            userId,
            articleId,
        });
        await newView.save();

        redisclient.zincrby('article_views', 1, articleId.toString(), (err, response) => {
            if (err) {
                console.error('Redis ZINCRBY error:', err);
                return res.status(500).send('Error incrementing article views');
            } else {
                console.log('ZINCRBY response:', response);
                res.status(200).send('Article view added successfully');
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/gotmoreview', function Fun(req,res){
        redisclient.zRangeWithScores('article_views', 0, 2)
        .then(response => {
            res.send(response);
        })
        .catch(err => {
            res.status(500).send('Redis ZRANGE error: ' + err);
        });
    })

    router.get('/gotmorelikes', function Fun(req,res){
        redisclient.zRangeWithScores('article_likes', 0, 2)
        .then(response => {
            res.send(response);
        })
        .catch(err => {
            res.status(500).send('Redis ZRANGE error: ' + err);
        });
    })

    

module.exports = router;
