import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

const HomePage = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [reload, setReload] = useState(true);

  const navigate = useNavigate();
  const API_URL = `https://moviesdatabase.p.rapidapi.com/titles/search/title/`;
  const rel_url = `https://moviesdatabase.p.rapidapi.com/titles?year=2023`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "d5dd3ae1c8msh71f0b7ff31e4715p1bc4d8jsna5bc1170782c",
      "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
    },
  };

  async function handleNew() {
    try {
      const response = await fetch(`${rel_url}`, options);
      const data = await response.json();
      setResults(data.results);
    } catch (e) {
      setResults([]);
      console.log(e);
    }
  }

  useEffect(() => {
    handleNew();
  }, []);

  async function handleClick() {
    setReload(false);
    try {
      const response = await fetch(`${API_URL}${term}?exact=false`, options);
      const data = await response.json();
      setResults(data.results);
    } catch (e) {
      setResults([]);
      console.log(e);
    }
  }

  return (
    <div className="App">
      <div className="heading">
        <h1>Netflix</h1>
      </div>
      <div className="search-div">
        <input
          onChange={(e) => {
            setTerm(e.target.value);
          }}
          id="inputBox"
          type="text"
          placeholder="Search Movies"
          value={term}
        />
        <button
          className="button"
          onClick={() => {
            handleClick();
          }}
        >
          Go
        </button>
      </div>
      <div className="container">
        {reload ? (
          results.map((item, index) => <MovieCard key={index} results={item} />)
        ) : results?.length > 0 ? (
          results.map((item, index) => <MovieCard key={index} results={item} />)
        ) : (
          <h2>Results Not Found</h2>
        )}
      </div>
    </div>
  );
};

export default HomePage;
