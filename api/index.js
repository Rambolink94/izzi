const express = require('express');
const app = express();
const genres = require('./routes/genres');

app.use(express.json());
// Assigning routers
app.use('/api/genres', genres);

// Start node.js server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));