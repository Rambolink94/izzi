const movieSrcAnalyzer = require("./movieSrcAnalyzer");
const analyzer = new movieSrcAnalyzer();

async function test() {
  const names = await analyzer.getMovieTitles();
  const ids = await analyzer.getTMDBids(names);
}

test();