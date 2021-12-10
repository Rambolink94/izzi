import MovieCard from "../MovieCard/MovieCard";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MovieStack.css";

function MovieStack(props) {
  const stackRef = useRef(null);

  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", () => checkArrows());
    //This might be causing an error
    checkArrows();

    return () => {
      window.removeEventListener("resize", () => checkArrows());
    };
  }, []);

  const checkArrows = () => {
    const stack = stackRef.current;
    if (!stack) return;
    const screenWidth = stack.offsetWidth;

    if (scrollX <= 0) setIsAtStart(true);
    else setIsAtStart(false);

    // Check if right should render
    // console.log(`${scrollX} + ${screenWidth} >= ${stack.scrollWidth}`);
    // console.log(`${scrollX} + ${screenWidth} >= ${scrollX}`);
    if (scrollX + screenWidth >= stack.scrollWidth) setIsAtEnd(true);
    else setIsAtEnd(false);
  };

  const scrollStack = (isLeft = true) => {
    const stack = stackRef.current;
    const screenWidth = stack.offsetWidth;
    const scrollWidth = stack.scrollWidth - screenWidth;

    // console.log("Stack Size:", screenWidth);
    // console.log("Scroll Width:", scrollWidth);
    // console.log("ScrollX: ", scrollX);

    // Set scroll position
    if (isLeft) {
      // console.log("Scroll: ", scrollX - screenWidth, " - ", 0);
      //stack.scrollBy({ top: 0, left: -stackSize, behavior: "smooth" });
      setScrollX(scrollX - screenWidth);
      if (scrollX - screenWidth <= 0) setIsAtStart(true);
      setIsAtEnd(false);
    } else {
      // console.log("Scroll: ", scrollX + screenWidth, " + ", scrollWidth);
      //stack.scrollBy({ top: 0, left: stackSize, behavior: "smooth" });
      setScrollX(scrollX + screenWidth);
      if (scrollX + screenWidth >= scrollWidth) setIsAtEnd(true);
      setIsAtStart(false);
    }
  };

  return (
    <div className="stack-wrapper">
      <div className="stack-title">
        <h4 className="genre-name">{props.genre.name}</h4>
        <Link
          to={{
            pathname: `genre/${props.genre.name}`,
            state: { genre: props.genre },
          }}
        >
          <p className="view-all-text">View All</p>
        </Link>
      </div>
      <div className="stack">
        <div
          className="left-arrow"
          style={!isAtStart ? { display: "" } : { display: "none" }}
          onClick={() => scrollStack(true)}
        >
          <FontAwesomeIcon
            className="arrow"
            icon="chevron-left"
            size="4x"
            inverse
          />
        </div>
        <div
          className="grid"
          style={{ transform: `translateX(-${scrollX}px)` }}
          ref={stackRef}
        >
          {props.movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} user={props.user} />
          ))}
        </div>
        <div
          className="right-arrow"
          style={!isAtEnd ? { display: "" } : { display: "none" }}
          onClick={() => scrollStack(false)}
        >
          <FontAwesomeIcon
            className="arrow"
            icon="chevron-right"
            size="4x"
            inverse
          />
        </div>
      </div>
    </div>
  );
}

export default MovieStack;
