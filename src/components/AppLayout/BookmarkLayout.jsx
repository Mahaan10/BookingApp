import { Outlet } from "react-router-dom";
import Map from "../../Map/Map";
import { useBookmark } from "../context/BookmarkListContext";

function BookmarkLayout() {
  const { bookmarks } = useBookmark();
  return (
    <div className="grid grid-cols-2 gap-4 min-[0px]:max-[800px]:grid-cols-1">
      <div className="flex flex-col">
        <Outlet />
      </div>
      <Map markerLocations={bookmarks} />
    </div>
  );
}

export default BookmarkLayout;
