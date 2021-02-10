const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, 'dist/react-clicker')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/react-clicker/index.html'));
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
