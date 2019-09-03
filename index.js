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

    Posts.findPostComments(commentsId)
        .then(comment => {
            if (comment) {
                res.status(200).json(comment)
            } else {
                res.status(404)({ message: "The comment with the specified ID does not exist." })
            }
        })
})

//post request to: /api/posts
server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;

    //Check if either title or contents are valid
    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        Posts.insert(req.body)
            .then(post => {
                res.status(201).json(post)
            })
            .catch(err => {
                res.status(500).json({ error: "There was an error while saving the post to the database" })
            })
    }
});

//post request to: /api/posts/:id/comments
server.post('/api/posts/:id/comments', (req, res) => {
    // const commentsId = req.body.post_id;
    const { text } = req.body;

    if (!text) {
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    } else {
        Posts.insertComment(req.body)
            .then(id => {
                if (id) {
                    res.status(201).json(id)
                } else {
                    req.status(404).json({ message: "The post with the specified ID does not exist." })
                };
            })
            .catch(() => {
                res.status(500).json(
                    { error: "There was an error while saving the comment to the database" }
                )
            });
    }
});

//DELETE request /api/posts/:id
server.delete('/api/posts/:id', (req, res) => {
    const postsId = req.params.id;

    Posts.remove(postsId)
        .then(id => {
            if (id) {
                res.status(200).json(id)
            } else {
                req.status(404).json({ message: "The post with the specified ID does not exist." })
            };
        })

        .catch(err => {
            res.status(500).json({ error: "The post information could not be modified." })
        })
});

//PUT request /api/posts/:id
server.put('/api/posts/:id', (req, res) => {
    const { title, contents } = req.body;

    if(!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        const postsId = req.params.id;
        Posts.update(postsId, req.body)
            .then(post => {
                if (post) {
                    res.status(200).json(post);
                }else {
                    res.status(404).json({ message: "The post with the specified ID does not exist." })
                }
            })
            .catch(err => {
                res.status(500).json({ error: "The post information could not be modified." })
            })
    }
})



const port = 5000;
server.listen(port, () => console.log(`\nAPI running on port ${port}\n`));