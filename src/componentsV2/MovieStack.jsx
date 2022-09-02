//import MovieCard from "../MovieCard/MovieCard";
import MovieCard from "./MovieCard";
import ArrowButton from "./ArrowButton";
import React, { useEffect, useState, useRef } from "react";
import { Stack, Box } from "@mui/system";
import { Typography } from "@mui/material";

function MovieStack({ movieData, genre }) {
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

  const stackStyle = {
    position: "relative",
    margin: "50px 80px",
  };

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
      setScrollX(scrollX + screenWidth);
      if (scrollX + screenWidth >= scrollWidth) setIsAtEnd(true);
      setIsAtStart(false);
    }
  };

  return (
    <Box style={{ position: "relative" }}>
      <ArrowButton
        active={!isAtStart}
        isLeft={true}
        onClick={() => scrollStack(true)}
      />
      <Box style={stackStyle}>
        {/* Add a stack header */}
        <Typography
          varient="h3"
          gutterBottom={true}
          alight="left"
          sx={{ color: "white", fontWeight: "bold" }}
        >
          {genre.name}
        </Typography>
        <Stack
          sx={{
            position: "relative",
            top: 0,
            left: 0,
            transform: `translateX(-${scrollX}px)`,
          }}
          direction="row"
          spacing={2}
          ref={stackRef}
        >
          {movieData.map((movieData, index) => (
            <MovieCard key={index} movieData={movieData} />
          ))}
          <MovieCard endCard={true} genre={genre} />
        </Stack>
      </Box>
      <ArrowButton
        active={!isAtEnd}
        isLeft={false}
        onClick={() => scrollStack(false)}
      />
    </Box>
  );
}

export default MovieStack;
