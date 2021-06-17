import MovieCard from "../MovieCard/MovieCard";
import React, { useEffect, useState, useRef } from "react";
import "./MovieStack.css";

function MovieStack(props) {
  const stackRef = useRef(null);

  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

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
    const stackSize = stack.offsetWidth;

    if (stack.scrollLeft <= 0) setIsAtStart(true);
    else setIsAtStart(false);

    // Check if right should render
    console.log(stack.scrollLeft, ":", stackSize, " => ", stack.scrollWidth);
    if (stack.scrollLeft + stackSize >= stack.scrollWidth) setIsAtEnd(true);
    else setIsAtEnd(false);
  };

  const scrollStack = (isLeft = true) => {
    const stack = stackRef.current;
    const stackSize = stack.offsetWidth;

    console.log("Stack Size:", stackSize);

    // Set scroll position
    if (isLeft) {
      console.log("Scroll: ", stack.scrollLeft - stackSize, " - ", 0);
      stack.scrollBy({ top: 0, left: -stackSize, behavior: "smooth" });
      if (stack.scrollLeft - stackSize <= 0) setIsAtStart(true);
      setIsAtEnd(false);
    } else {
      console.log(
        "Scroll: ",
        stack.scrollLeft + stackSize,
        " - ",
        stack.scrollWidth
      );
      stack.scrollBy({ top: 0, left: stackSize, behavior: "smooth" });
      if (stack.scrollWidth - (stack.scrollLeft + stackSize) < stackSize)
        setIsAtEnd(true);
      setIsAtStart(false);
    }

    console.log(stack.scrollWidth - stack.scrollLeft, " < ", stackSize);
  };

  return (
    <div className="stack-wrapper">
      <h4 className="stack-title">{props.genre}</h4>
      <div className="stack">
        <div className="grid" ref={stackRef}>
          {props.movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
        <div className="arrow-wrapper">
          {/* Consider making arrows components. Refactor regardless. */}
          <div
            className="right-arrow"
            style={!isAtEnd ? { display: "" } : { display: "none" }}
            onClick={() => scrollStack(false)}
          >
            <img
              className="arrow"
              src={process.env.PUBLIC_URL + "./icons/arrow.png"}
              alt="Arrow"
            ></img>
          </div>
          <div
            className="left-arrow"
            style={!isAtStart ? { display: "" } : { display: "none" }}
            onClick={() => scrollStack(true)}
          >
            <img
              className="arrow"
              src={process.env.PUBLIC_URL + "./icons/arrow.png"}
              alt="Arrow"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieStack;
