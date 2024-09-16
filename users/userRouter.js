const express = require('express');
const router = require('express').Router();

const Posts = require('../posts/postDb');
const Users = require('./userDb');



router.post('/', validateUser, (req, res) => {
    Users.insert(req.body)
      .then(user => res.status(201).json(user))
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Error adding the user' });
      });
    })

router.post('/:id/posts', (req, res) => {
    const postInfo = { ...req.body};

    Posts.insert(postInfo)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Error adding the post for the user' });
      });
  });


router.get('/', (req, res) => {
    // router.get('/', (req, res) => {
        Users.get(req.query)
          .then(users => res.status(200).json(users))
          .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Error retrieving the users' });
          })
})


router.get('/:id', (req, res) => {
    Users.getById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
});

router.get('/:id/posts', (req, res) => {
    Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error getting the posts for the user' });
    });
});

router.delete('/:id', (req, res) => {
    Users.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The user has been deleted' });
      } else {
        res.status(404).json({ message: 'The user could not be found' });
      }
});
})

router.put('/:id', (req, res) => {
    Users.update(req.params.id, req.body)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
});
})

//custom middleware



// Validate user ID on every request expecting user ID 
function validateUserId(req, res, next) {
    Users.getById(req.params.id)
      .then(user => {
        if (!user) {
          res.status(400).json({ message: 'Invalid user ID' });
        } else {
          req.user = req.params.id;
          next();
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Error validating user ID' });
      });
    // next();
  }
  
  // Validate body on create new user request 
  function validateUser(req, res, next) {
    if (!Object.keys(req.body).length) {
      res.status(400).json({ message: 'Missing user data!' });
    } else if (!req.body.name) {
      res.status(400).json({ message: 'Missing required "name" field!' });
    } else {
      next();
    }
    
  }
  
  // Validate body on create new post request 
  
  function validatePost(req, res, next) {
    if (!Object.keys(req.body).length) {
      res.status(400).json({ message: 'Missing post data!' });
    } else if (!req.body.text) {
      res.status(400).json({ message: 'Missing required "text" field!' });
    } else {
      next();
    }

  }
  function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  
    next();
  }

module.exports = router
