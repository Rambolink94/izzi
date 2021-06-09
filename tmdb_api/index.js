const express = require('express');
const app = express();
const search = require('./routes/search');

app.use(express.json());
// Assigning routers
app.use('/api/search/', search);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));