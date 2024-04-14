const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let users = [
  { id: 1, username: 'John' },
  { id: 2, username: 'Jane' }
];

app.use(bodyParser.json());

app.get('/api/users', (req, res) => {
  try {
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

app.post('/api/users', (req, res) => {

  try {

    const username = req.body?.username;
    const userExists = Boolean(username) ?? false;

    if (userExists == true) {
      users.push({
        id: Math.floor(Math.random() * 500),
        username: username
      })
      return res.status(201).json({'message': 'User created successfully'});
    }
    res.status(400).json({ error: 'Username is required' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }


});

app.put('/api/users', (req, res) => {
  console.log(req.body)
  let {id, username} = req.body;
  try {
    const userExists = Boolean(users.find((user) => user.id == id));

    if(userExists == true) {
      users = users.map((user) => user.id == id ? {id, username} : user);
      return res.status(201).json({'message': 'User updated successfully'});
    } 

    res.status(400).json({ error: 'Cannot find user to update' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/users', (req, res) => {
  let {id} = req.body;
  try {
    const userExists = Boolean(users.find((user) => user.id == id));

    if(userExists == true) {
      users = users.filter((user) => user.id != id );
      return res.status(200).json({'message': 'User deleted successfully'});
    } 
    res.status(400).json({'message': 'Cannot find user to delete'});

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

})      

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
