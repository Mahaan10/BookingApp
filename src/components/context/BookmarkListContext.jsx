import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const baseUrl = "/api/hotels";
const BookmarkContext = createContext();

const initialState = {
  bookmarks: [],
  isLoading: false,
  currentBookmark: {},
  error: null,
};

function bookmarkReducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "bookmarks/loaded":
      return {
        ...state,
        isLoading: false,
        bookmarks: action.payLoad,
      };
    case "bookmark/created":
      return {
        ...state,
        isLoading: false,
        bookmarks: [...state.bookmarks, action.payLoad],
        currentBookmark: action.payLoad,
      };
    case "bookmark/loaded":
      return {
        ...state,
        isLoading: false,
        currentBookmark: action.payLoad,
      };
    case "bookmark/deleted":
      return {
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.filter((item) => item.id !== action.payLoad),
        currentBookmark: {},
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
      };
    default:
      throw new Error("Unknown Action!");
  }
}

function BookmarkListProvider({ children }) {
  const [{ bookmarks, isLoading, currentBookmark }, dispatch] = useReducer(
    bookmarkReducer,
    initialState
  );

  useEffect(() => {
    async function fetchBookmarkList() {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(`${baseUrl}/bookmarks/`);
        dispatch({ type: "bookmarks/loaded", payLoad: data });
      } catch (error) {
        dispatch({ type: "rejected", payLoad: error.message });
      }
    }

    fetchBookmarkList();
  }, []);

  async function getBookmark(id) {
    if (Number(id) === currentBookmark?.id) return;
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`${baseUrl}/bookmarks/${id}`);
      dispatch({ type: "bookmark/loaded", payLoad: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected", payLoad: error.message });
    }
  }

  async function createBookmark(newBookmark) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(`${baseUrl}/bookmarks/`, newBookmark);
      dispatch({ type: "bookmark/created", payLoad: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected", payLoad: error.message });
    }
  }

  async function removeBookmark(id) {
    dispatch({ type: "loading" });
    try {
      await axios.delete(`${baseUrl}/bookmarks/${id}`);
      dispatch({ type: "bookmark/deleted", payLoad: id });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected", payLoad: error.message });
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        bookmarks,
        getBookmark,
        currentBookmark,
        createBookmark,
        removeBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarkListProvider;

export function useBookmark() {
  return useContext(BookmarkContext);
}
