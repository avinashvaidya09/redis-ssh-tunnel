const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Redis SSH Tunnel App is running.');
});

app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});
