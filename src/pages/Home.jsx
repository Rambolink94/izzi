import React, { useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../componentsV2/Header";
import Footer from "../components/Footer/Footer";
import useGenreSearch from "../hooks/useGenreSearch";
import MovieStack from "../componentsV2/MovieStack";

function Home() {
  const [pageNumber, setPageNumber] = useState(1);
  const location = useLocation();

  const { loading, genres, error, hasMore } = useGenreSearch(pageNumber);

  const observer = useRef();
  const lastStackRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      console.log(hasMore);
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("Visible");
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const user = location.state
    ? location.state.user
    : JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Header />
      <Box>
        {genres.map((genre, index) => {
          return (
            <MovieStack
              innerRef={genres.length === index + 1 ? lastStackRef : null}
              key={index}
              genre={genre}
              user={user}
            />
          );
        })}
      </Box>
      <Footer />
    </>
  );
}

export default Home;
