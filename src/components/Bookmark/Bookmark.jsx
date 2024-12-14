import { Link } from "react-router-dom";
import { useBookmark } from "../context/BookmarkListContext";
import Loader from "../Loader";
import ReactCountryFlag from "react-country-flag";
import { BiTrash } from "react-icons/bi";

function BookmarkList() {
  const { isLoading, bookmarks, currentBookmark, removeBookmark } =
    useBookmark();
  if (isLoading) return <Loader />;

  if (!bookmarks.length) return <p>There is no bookmarked location!</p>;

  return (
    <div className="">
      <h2 className="font-bold text-xl">Bookmark List</h2>
      <div className="mt-4">
        {bookmarks.map((item) => (
          <Link
            key={item.id}
            to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <BookmarkListItem
              item={item}
              currentBookmark={currentBookmark}
              removeBookmark={removeBookmark}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BookmarkList;

function BookmarkListItem({ item, currentBookmark, removeBookmark }) {
  const removeHandler = async (e, id) => {
    e.preventDefault();
    await removeBookmark(id);
  };

  return (
    <div
      className={`mb-4 border rounded-2xl p-4 flex items-center justify-between ${
        item.id === currentBookmark?.id
          ? "border-2 border-sky-700 bg-slate-200"
          : ""
      }`}
    >
      <div className="flex items-center gap-6">
        <ReactCountryFlag svg countryCode={item.countryCode} />
        <strong>{item.cityName}</strong>
        <span>{item.country}</span>
      </div>
      <button
        className="w-4 h-4 text-rose-600"
        onClick={(e) => removeHandler(e, item.id)}
      >
        <BiTrash />
      </button>
    </div>
  );
}
