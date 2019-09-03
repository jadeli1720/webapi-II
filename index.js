const express = require('express');
const Posts = require('./data/db');

const server = express('');

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello World')
});

// GET request to /api/posts
server.get('/api/posts', (req, res) => {
    Posts.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(() => {
            res.status(500).json({
                error: "The posts information could not be retrieved"
            })
        });
});

//Get request to /api/posts/:id
server.get('/api/posts/:id', (req, res) => {
    const postId = req.params.id;

    Posts.findById(postId)
        .then(id => {
            if (id) {
                res.status(200).json(id)
            } else {
                res.status(404)({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(() => {
            res.status(500).json({
                error: "The post information could not be retrieved."
            });
        });
});

//Get request /api/posts/:id/comments
server.get('/api/posts/:id/comments', (req, res) => {
    const commentsId = req.params.id;

    Posts.findCommentById()
})


///api/posts

//post request to: /api/posts
server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;

    //Check if either title or contents are valid
    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        Posts.insert(req.body)
            .then(post => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json({ error: "There was an error while saving the post to the database" })
            })
    }
});

//post request to: /api/posts/:id/comments
server.post('/api/posts/:id/comments', (req, res) => {
    const commentsId = req.params.id;
    if (!commentsId) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else {
        Posts.insert()
    }
});


//get posts



const port = 5000;
server.listen(port, () => console.log(`\nAPI running on port ${port}\n`));