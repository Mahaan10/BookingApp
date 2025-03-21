import Header from "./components/Header/Header";
import { Toaster } from "react-hot-toast";
import LocationList from "./components/LocationList";
import { Route, Routes } from "react-router-dom";
import HotelLayout from "./components/AppLayout/HotelLayout";
import Hotels from "./Hotels/Hotels";
import HotelsProvider from "./components/context/HotelsProvider";
import SingleHotel from "./Hotels/SingleHotel";
import BookmarkLayout from "./components/AppLayout/BookmarkLayout";
import BookmarkList from "./components/Bookmark/Bookmark";
import BookmarkListProvider from "./components/context/BookmarkListContext";
import SingleBookmark from "./components/Bookmark/SingleBookmark";
import AddNewBookmark from "./components/Bookmark/AddNewBookmark";


function App() {
  return (
    <>
        <BookmarkListProvider>
          <HotelsProvider>
            <Toaster />
            <Header />
            <Routes>
              <Route path="/" element={<LocationList />} />
              <Route path="/hotels" element={<HotelLayout />}>
                <Route index element={<Hotels />} />
                <Route path=":id" element={<SingleHotel />} />
              </Route>
              <Route
                path="/bookmark"
                element={
                    <BookmarkLayout />
                }
              >
                <Route index element={<BookmarkList />} />
                <Route path=":id" element={<SingleBookmark />} />
                <Route path="add" element={<AddNewBookmark />} />
              </Route>
            </Routes>
          </HotelsProvider>
        </BookmarkListProvider>
    </>
  );
}

export default App;
