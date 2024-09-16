  
const express = require('express');
// const server = require('express')();
const server =express();
const helmet = require('helmet');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');


server.use(helmet());
server.use(express.json());
// server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);
});

// const port = process.env.PORT || 8000;
// server.listen(port, () =>
//   console.log(`\n*** Server running on http://localhost:${port} ***\n`),
// );
//custom middleware

// function logger(req, res, next) {
//   function logger(req, res, next) {
//     console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  
//     next();
//   }
// };

const port = process.env.PORT || 8000;
server.listen(port, () =>
  console.log(`\n*** Server running on http://localhost:${port} ***\n`),
);

module.exports = server;