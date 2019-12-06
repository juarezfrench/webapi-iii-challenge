const express = require('express');

const router = require('express').Router();

const Posts = require('./postDb');
const Users = require('../users/userDb');



router.get('/', (req, res) => {
   
        Posts.get(req.query)
          .then(posts => res.status(200).json(posts))
          .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Error retrieving the posts' });
          });
});

router.get('/:id', (req, res) => {
    router.get('/:id', validatePostId, (req, res) => {
        Posts.getById(req.params.id)
          .then(post => res.status(200).json(post))
          .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Error retrieving the post' });
          });
      });
});

router.delete('/:id', (req, res) => {
    router.delete('/:id', validatePostId, (req, res) => {
        Posts.remove(req.params.id)
          .then(count =>
            res.status(200).json({ message: 'The post has been deleted' }),
          )
          .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Error removing the post' });
          });
      });
});

router.put('/:id', (req, res) => {
    router.put('/:id', validatePostId, (req, res) => {
        Posts.update(req.params.id, req.body)
          .then(post => res.status(200).json(post))
          .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Error updating the post' });
          });
      });
});

// custom middleware

function validatePostId(req, res, next) {
    function validatePostId(req, res, next) {
        Posts.getById(req.params.id)
          .then(post => {
            if (!post) {
              res.status(400).json({ message: 'Invalid post ID' });
            } else {
              req.post = req.params.id;
              next();
            }
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Error validating post ID' });
          });
      
      }
      
}

module.exports = router