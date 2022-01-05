const knex = require("../../database");
const tableNames = require("../../utility/tableNames");

const createMovieProgress = async (userId, movieId, timeElapsed) => {
  try {
    const progresses = await getUMPByIds(userId, movieId);

    // A progress already exists for this user and movie, update
    if (progresses && progresses.length > 0) {
      await knex(tableNames.userMovieProgresses)
        .update({
          time_elapsed: timeElapsed,
        })
        .where("user_id", userId)
        .andWhere("movie_id", movieId);
    } else {
      await knex(tableNames.userMovieProgresses).insert({
        user_id: userId,
        movie_id: movieId,
        time_elapsed: timeElapsed,
      });
    }
    console.log("HERE");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getUMPByIds = async (userId, movieId) => {
  const results = await knex(tableNames.userMovieProgresses)
    .select("*")
    .where("user_id", userId)
    .andWhere("movie_id", movieId);

  return results;
};

module.exports = {
  createMovieProgress,
  getUMPByIds,
};
