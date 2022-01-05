// Get all collections
exports.getAllCollections = async (req, res) => {
  knex
    .select("*")
    .from("collections")
    .then((collections) => res.json(collections))
    .catch((error) =>
      res.json({
        message: `There was an error retrieving collections: ${error}`,
      })
    );
};

// Create a collection
exports.createCollection = async (req, res) => {
  knex("collections")
    .insert({
      tmdb_collection_id: req.body.tmdbCollectionId,
      name: req.body.name,
    })
    .then(() => {
      res.json({ message: `Collection '${req.body.name}' created.` });
    })
    .catch((error) => {
      res.json({
        message: `There was an error creating collection ${req.body.name}: ${error}`,
      });
    });
};

// Create collection connection
exports.createCollectionConnection = async (req, res) => {
  knex("movie_collections")
    .insert({
      movie_id: req.body.movieId,
      collection_id: req.body.collectionId,
    })
    .then(() => {
      res.json({ message: `Collection connection  created.` });
    })
    .catch((error) => {
      res.json({
        message: `There was an error creating collection connection: ${error}`,
      });
    });
};
