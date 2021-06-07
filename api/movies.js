var express = require('express');
var app = express();

app.use(express.json());



// Start node.js server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));