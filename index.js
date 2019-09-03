const express = require('express');

const server = express('');

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello World')
});

const port = 5000;
server.listen(port, () => console.log(`\nAPI running on port ${port}\n`));