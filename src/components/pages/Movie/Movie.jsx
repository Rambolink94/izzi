import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import { useHistory } from "react-router-dom";

function Movie() {
  const history = useHistory();

  return (
    <div className="app">
      <Header />
      <video src="" />
      <button onClick={() => history.goBack()}>Go Back</button>
      <Footer />
    </div>
  );
}

export default Movie;
