
const express = require("express");

const Users = require ("./data/db");

const server = express();

server.use(express.json());

server.get('/', function(request, response) {
    response.send({ hello: 'Web 25!' });
  });

server.get('/api/users', (req, res) => {
    
    Users.find() 
      .then(users => {
        console.log('Hubs', users);
        res.status(200).json(users);
      })
      .catch(error => {
        console.log(error);
        
        
        res.status(500).json({
          errorMessage: 'sorry, we ran into an error getting the list of users',
        });
      });
  });

  server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    
    Users.findById(id) 
      .then(user => {
          if (user) {
              res.status(200).json(user);
          } else {
              res.status(404).json({ errorMessage: "The user with the specified ID does not exist."})
          }
        console.log('Hubs', user);
        res.status(200).json(user);
      })
      .catch(error => {
        console.log(error);
        
        res.status(500).json({
          errorMessage: 'sorry, we ran into an error getting the list of users',
        });
      });
  });

  server.post('/api/users', (req, res) => {
    const {name, bio} = req.body; 
  
    
    if (!name || !bio) {
        res
        .status(400)
        .json({errorMessage: "Please provide name and bio for the user."})
    }
    else {

    
    Users.insert(req.body)
      .then(user => {
        res
        .status(201)
        .json(user);
      })
      .catch(error => {
        console.log(error);
        
        res
        .status(500)
        .json({
          errorMessage: 'sorry, we ran into an error creating the user',
        });
      });
  }
});

  server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(404).json({
            message: "The user with the specified ID does not exist."
        })
    } else {
  
    Users.remove(id)
      .then(deleted => {
        
        res
        .status(200)
        .json(deleted);
      })
      .catch(error => {
        console.log(error);
        
        res.status(500).json({
          errorMessage: 'sorry, we ran into an error removing the user',
        });
      });
    }
  });

  server.put('/api/users/:id', (req, res) => {
    const { name, bio } = req.body;
  
    if (!name || !bio) {
      res
        .status(400)
        .json({ errorMessage: 'Please provide name and bio for the user.' });
    } else {
      Users.update(req.params.id, req.body)
        .then(user => {
          if (user) {
            res.status(200).json(user);
          } else {
            res
              .status(404)
              .json({
                message: 'The user with the specified ID does not exist.',
              });
          }
        })
        .catch(() => {
          res.status(500).json({
            errorMessage: 'The user information could not be modified.',
          });
        });
    }
  });

  const port = 5000;
server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n`));