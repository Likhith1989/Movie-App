const MovieCard = ({
  results: { titleText, primaryImage, releaseYear, titleType },
}) => {
  return (
    <>
      <div className="movie">
        <div>
          <p>{releaseYear !== null ? releaseYear.year : "unknown"}</p>
        </div>

        <div>
          <img
            src={
              primaryImage !== null
                ? primaryImage.url
                : "https://via.placeholder.com/400"
            }
            alt={titleText.text}
          />
        </div>

        <div>
          <span>{titleType.type}</span>
          <h3>{titleText.text}</h3>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
