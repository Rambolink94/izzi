const path = require("path");
const dbPath = path.resolve(__dirname, "db/database.sqlite");

const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true,
});

const resetTables = false;
if (resetTables) {
  knex.schema.dropTable("movies").then(() => console.log("Dropped"));
  knex.schema.dropTable("movie_genres").then(() => console.log("Dropped"));
  knex.schema.dropTable("genres").then(() => console.log("Dropped"));
  knex.schema.dropTable("movie_collections").then(() => console.log("Dropped"));
  knex.schema.dropTable("collections").then(() => console.log("Dropped"));
  knex.schema
    .dropTable("movie_contributers")
    .then(() => console.log("Dropped"));
  knex.schema.dropTable("users").then(() => console.log("Dropped"));
  knex.schema
    .dropTable("user_movie_progresses")
    .then(() => console.log("Dropped"));
}

// Create Movie Table
knex.schema
  .hasTable("movies")
  .then((exists) => {
    if (!exists) {
      // If table doesn't exist, create it.
      return knex.schema
        .createTable("movies", (table) => {
          table.increments("id").primary();
          table.integer("tmdb_id");
          table.unique("tmdb_id");
          table.string("title");
          table.string("description");
          table.string("poster_path");
          table.string("backdrop_path");
          table.string("video_src");
          table.date("release_date");
          table.integer("runtime");
          table.boolean("connected");
        })
        .then(() => {
          console.log("Table 'movies' created...");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .catch((error) => {
    console.error(`There was an error initializing the database: ${error}`);
  });

// Create movie_genres Table
knex.schema
  .hasTable("movie_genres")
  .then((exists) => {
    if (!exists) {
      // If table doesn't exist, create it.
      return knex.schema
        .createTable("movie_genres", (table) => {
          table.increments("id").primary();
          table.integer("movie_id");
          table.integer("genre_id");
        })
        .then(() => {
          console.log("Table 'movie_genres' created...");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .catch((error) => {
    console.error(`There was an error initializing the database: ${error}`);
  });

// Create Genre Table
knex.schema
  .hasTable("genres")
  .then((exists) => {
    if (!exists) {
      // If table doesn't exist, create it.
      return knex.schema
        .createTable("genres", (table) => {
          table.increments("id").primary();
          table.integer("tmdb_genre_id");
          table.unique("tmdb_genre_id");
          table.string("name");
        })
        .then(() => {
          console.log("Table 'genres' created...");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .catch((error) => {
    console.error(`There was an error initializing the database: ${error}`);
  });

// Create movie_collections Table
knex.schema
  .hasTable("movie_collections")
  .then((exists) => {
    if (!exists) {
      // If table doesn't exist, create it.
      return knex.schema
        .createTable("movie_collections", (table) => {
          table.increments("id").primary();
          table.integer("movie_id");
          table.integer("collection_id");
        })
        .then(() => {
          console.log("Table 'movie_collections' created...");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .catch((error) => {
    console.error(`There was an error initializing the database: ${error}`);
  });

// Create Collection Table
knex.schema
  .hasTable("collections")
  .then((exists) => {
    if (!exists) {
      // If table doesn't exist, create it.
      return knex.schema
        .createTable("collections", (table) => {
          table.increments("id").primary();
          table.string("tmdb_collection_id");
          table.string("name");
        })
        .then(() => {
          console.log("Table 'collections' created...");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .catch((error) => {
    console.error(`There was an error initializing the database: ${error}`);
  });

// Create movie_contributers Table
knex.schema
  .hasTable("movie_contributers")
  .then((exists) => {
    if (!exists) {
      // If table doesn't exist, create it.
      return knex.schema
        .createTable("movie_contributers", (table) => {
          table.increments("id").primary();
          table.integer("movie_id");
          table.integer("contributer_id");
        })
        .then(() => {
          console.log("Table 'movie_contributers' created...");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .catch((error) => {
    console.error(`There was an error initializing the database: ${error}`);
  });

/*
// Create contributers Table
knex.schema
.hasTable("contributers")
.then((exists) => {
  if (!exists) {
    // If table doesn't exist, create it.
    return knex.schema
      .createTable("contributers", (table) => {
        table.increments("id").primary();
        
      })
      .then(() => {
        console.log("Table 'contributers' created...");
      })
      .catch((error) => {
        console.error(`There was an error creating table: ${error}`);
      });
  }
})
.then(() => {
  console.log("Database initialized.");
})
.catch((error) => {
  console.error(`There was an error initializing the database: ${error}`);
});
*/

// Create users Table
knex.schema
  .hasTable("users")
  .then((exists) => {
    if (!exists) {
      // If table doesn't exist, create it.
      return knex.schema
        .createTable("users", (table) => {
          table.increments("id").primary();
          table.string("username");
          table.boolean("allow_adult_content");
          table.string("profile_image");
        })
        .then(() => {
          console.log("Table 'users' created...");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .catch((error) => {
    console.error(`There was an error initializing the database: ${error}`);
  });

// Create user_movie_progress Table
knex.schema
  .hasTable("user_movie_progresses")
  .then((exists) => {
    if (!exists) {
      // If table doesn't exist, create it.
      return knex.schema
        .createTable("user_movie_progresses", (table) => {
          table.increments("id").primary();
          table.integer("user_id");
          table.integer("movie_id");
          table.integer("time_elapsed");
        })
        .then(() => {
          console.log("Table 'user_movie_progresses' created...");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .catch((error) => {
    console.error(`There was an error initializing the database: ${error}`);
  });

module.exports = knex;
