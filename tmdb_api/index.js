const express = require("express");
const app = express();
const cors = require("cors");
const search = require("./routes/search");
const movies = require("./routes/movies");

app.use(cors());
app.use(express.json());
// Assigning routers
app.use("/api/search/", search);
app.use("/api/movies/", movies);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
