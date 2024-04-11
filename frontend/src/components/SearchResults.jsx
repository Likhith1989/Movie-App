import MovieCard from "./MovieCard";
import { useParams } from "react-router-dom";

const SearchResults = () => {
  const { term } = useParams();

  return (
    <>
      <h2>Search Results for: {term}</h2>
      <MovieCard text={term} />
    </>
  );
};

export default SearchResults;
