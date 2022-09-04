//import MovieCard from "../MovieCard/MovieCard";
import MovieCard from "./MovieCard";
import ArrowButton from "./ArrowButton";
import React, { useEffect, useState, useRef } from "react";
import { Stack, Box } from "@mui/system";
import { Typography } from "@mui/material";
import useMovieSearch from "../hooks/useMovieSearch";
import SkeletonCard from "./SkeletonCard";

function MovieStack({ genre, user, innerRef }) {
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
  });

  const { loading, movies } = useMovieSearch(genre, user, 30);

  const stackStyle = {
    position: "relative",
    margin: "50px 80px",
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
  };

  const checkArrows = () => {
    const stack = stackRef.current;
    if (!stack) return;
    const screenWidth = stack.offsetWidth;

    console.log(
      "Scroll X:" +
        scrollX +
        " Screen W: " +
        screenWidth +
        " Scroll W: " +
        stack.scrollWidth
    );
    if (scrollX <= 0) setIsAtStart(true);
    else setIsAtStart(false);

    // Check if right should render
    if (scrollX + screenWidth >= stack.scrollWidth) setIsAtEnd(true);
    else setIsAtEnd(false);
  };

  const createSkeletons = () => {
    let skeletons = [];
    const size = 10;
    for (let i = 0; i < size; i++) {
      skeletons.push(<SkeletonCard key={i} />);
    }

    return skeletons;
  };

  const scrollStack = (isLeft = true) => {
    const stack = stackRef.current;
    const screenWidth = stack.offsetWidth;
    const scrollWidth = stack.scrollWidth - screenWidth;

    // Set scroll position
    if (isLeft) {
      setScrollX(scrollX - screenWidth);

      // Is at far left
      if (scrollX - screenWidth <= 0) setIsAtStart(true);
      setIsAtEnd(false);
    } else {
      setScrollX(scrollX + screenWidth);

      // Is at far right
      if (scrollX + screenWidth >= scrollWidth) setIsAtEnd(true);
      setIsAtStart(false);
    }
  };

  return (
    <Box ref={innerRef} style={{ position: "relative", minHeight: 150 }}>
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
            minHeight: 200,
          }}
          direction="row"
          spacing={2}
          ref={stackRef}
        >
          {movies?.length
            ? movies.map((movieData, index) => (
                <MovieCard key={index} movieData={movieData} />
              ))
            : createSkeletons()}
          {!loading && <MovieCard endCard={true} />}
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
