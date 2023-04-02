const router = require('express').Router();
const { User, BlogPost } = require('../models');
const withAuth = require('../utils/auth');
const { Sequelize } = require('sequelize');

router.get('/', async (req, res) => {
    const posts = await BlogPost.findAll(
        {
            include: [
                {
                    model: User,
                    attributes: { exclude: ['password']}
                }  
            ]
        }
    );
    const blogs = posts.map((post) => post.get({ plain: true }));
    res.render('home', { blogs: blogs });
});

router.get('/login', async (req, res) => {
    res.render('login');
});


module.exports = router;