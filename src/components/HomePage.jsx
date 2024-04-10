import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

const HomePage = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [reload, setReload] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const url = `http://www.omdbapi.com/?apikey=5e797eee&`;
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
    setIsLoading(true);
    setReload(false);
    try {
      const response = await fetch(`${API_URL}${term}?exact=false`, options);
      const data = await response.json();
      setIsLoading(false);
      setResults(data.results);
    } catch (e) {
      setResults([]);
      console.log(e);
    }
  }

  return (
    <div className="App">
      <div className="text-center p-10">
        <h1 className="font-bold text-4xl mb-4">Movie App</h1>
      </div>

      <div className=" flex  justify-center items-center ">
        <div className="flex relative rounded-md w-full px-1 max-w-xl">
          <input
            onChange={(e) => {
              setTerm(e.target.value);
            }}
            value={term}
            type="text"
            name="q"
            id="query"
            placeholder="Search Movies"
            className="w-full p-3 rounded-md border-2 border-r-white rounded-r-none border-gray-300 placeholder-gray-500 dark:placeholder-gray-300 dark:bg-gray-500dark:text-gray-300 dark:border-none "
          />
          {isLoading ? (
            <button
              type="button"
              className="inline-flex items-center gap-2 bg-violet-700 text-white text-lg font-semibold py-3 px-6 rounded-r-md"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="mr-2 animate-spin"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
              </svg>
              loading
            </button>
          ) : (
            <button
              onClick={() => {
                handleClick();
              }}
              className="inline-flex items-center gap-2 bg-violet-700 text-white text-lg font-semibold py-3 px-6 rounded-r-md"
            >
              <span>search</span>
            </button>
          )}
        </div>
      </div>

      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {reload ? (
          results.map((item, index) => <MovieCard key={index} results={item} />)
        ) : results?.length > 0 ? (
          results.map((item, index) => <MovieCard key={index} results={item} />)
        ) : (
          <h2>Results Not Found</h2>
        )}
      </section>
    </div>
  );
};

export default HomePage;
