const knex = require("../../database");

const handleCollections = async (collectionData) => {
  if (!collectionData) return null; // No data received

  let id = await getCollectionByTmdbId(collectionData.id);

  // If id already exists return, else create
  if (!id) {
    await knex("collections").insert({
      tmdb_collection_id: collectionData.id,
      name: collectionData.name,
    });

    id = await getCollectionByTmdbId(collectionData.id);
  }

  return id;
};

const handleCollectionConnections = async (collectionId, movieId) => {
  // Check if there already is a connection for this genre and movie
  if (!collectionId || !movieId) return;

  const id = await getCollectionConnection(collectionId, movieId);
  if (!id) {
    // If connection doesn't already exist
    await knex("movie_collections").insert({
      movie_id: movieId,
      collection_id: collectionId,
    });
  }
};

const getCollectionByTmdbId = async (tmdbId) => {
  const results = await knex("collections")
    .select("id")
    .where("tmdb_collection_id", tmdbId);

  return results[0]?.id;
};

const getCollectionConnection = async (collectionId, movieId) => {
  const results = await knex("movie_collections")
    .select("id")
    .where("collection_id", collectionId)
    .andWhere("movie_id", movieId);

  return results[0]?.id;
};

module.exports = {
  handleCollections,
  handleCollectionConnections,
};
