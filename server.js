const express = require('express');
// actually use the .env file created
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.send('Hiya!');
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
