# izzi Home Media Server and Streaming App

izzi is a streaming application that allows you to stream movies from a local network server. The app queries data from the TMDb API (https://www.themoviedb.org/) and uses that information to categorize and provide a better user interface for accessing your movies.

# Start the frontend
```sh
npm start
```

# Start the backend
```sh
cd tmdb_api
node index.js
```

The backend currently initializes and updates the entire list of movies each time you start the server. This will definitely need to be changed. However, I may rewrite the server app in C# and .NET anyway.

And there you go! The app should now be up and running and you can start streaming any of your movies to your local network.

![image](https://user-images.githubusercontent.com/31221007/133735434-b85e9f2a-05f9-48fc-a946-e6b92288bb9b.png)

