const MovieCard = ({
  results: { titleText, primaryImage, releaseYear, titleType },
}) => {
  return (
    <>
      <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <img
          src={
            primaryImage !== null
              ? primaryImage.url
              : "https://via.placeholder.com/400"
          }
          alt={titleText.text}
          className="h-80 w-72 object-cover rounded-t-xl"
        />
        <div className="px-4 py-3 w-72">
          <p className="text-lg font-bold text-black truncate block capitalize">
            {titleType.type}
          </p>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              {titleText.text}
            </p>

            <p className="text-sm text-gray-600 cursor-auto ml-2">
              {releaseYear !== null ? releaseYear.year : "unknown"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
