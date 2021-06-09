var express = require('express');
var router = express.Router();

const genres = [
    { id: 1, name: 'comedy' },
    { id: 2, name: 'action' },
    { id: 3, name: 'adventure' }
]

router.get('/', (req, res) => {
    res.send(genres);
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const genre = genres.find(g => g.id === parseInt(id));
    if (!genre) res.status(404).send(`The genre with ID of ${id} was not found.`);
    res.send(genre);
});

router.post('/', (req, res) => {
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

module.exports = router;