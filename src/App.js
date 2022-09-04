import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowAltCircleLeft,
  faArrowLeft,
  faPlay,
  faChevronLeft,
  faChevronRight,
  faInfoCircle,
  faSearch,
  faEllipsisV,
  faBell,
  faFilter,
  faSort,
  faSortAlphaDown,
  faSortAlphaDownAlt,
  faThList,
  faThLarge,
  faPlus,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import SelectUser from "./components/pages/SelectUser/SelectUser";
import Movie from "./components/pages/Movie/Movie";
import Genre from "./components/pages/Genre/Genre";
import Search from "./components/pages/Search/Search";
import Home from "./pages/Home";

library.add(
  faArrowAltCircleLeft,
  faArrowLeft,
  faPlay,
  faChevronLeft,
  faChevronRight,
  faInfoCircle,
  faSearch,
  faEllipsisV,
  faBell,
  faFilter,
  faSort,
  faSortAlphaDown,
  faSortAlphaDownAlt,
  faThList,
  faThLarge,
  faPlus,
  faCheck,
  faTimes
);

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* Default path */}
          <Route exact path="/">
            <SelectUser />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/movie">
            <Movie />
          </Route>
          <Route path="/genre">
            <Genre />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
