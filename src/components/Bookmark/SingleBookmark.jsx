import { useNavigate, useParams } from "react-router-dom";
import { useBookmark } from "../context/BookmarkListContext";
import { useEffect } from "react";
import Loader from "../Loader";
import ReactCountryFlag from "react-country-flag";

function SingleBookmark() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookmark, isLoading, currentBookmark } =
    useBookmark();
  useEffect(() => {
    getBookmark(id);
  }, [id, getBookmark]);

  const backHandler = () => {
    navigate(-1);
  };

  if (isLoading) return  <Loader />;
  return (
    <div className="">
      <button
        className="px-4 py-2 rounded-lg border bg-zinc-200 mb-4 hover:bg-zinc-300"
        onClick={backHandler}
      >
        &larr; Back
      </button>
      <div className="rounded-lg border p-2 bg-zinc-100">
        <h1 className="font-bold text-xl">{currentBookmark.cityName}</h1>
        <p>
          {currentBookmark.cityName} - {currentBookmark.country}
        </p>
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
      </div>
    </div>
  );
}

export default SingleBookmark;
