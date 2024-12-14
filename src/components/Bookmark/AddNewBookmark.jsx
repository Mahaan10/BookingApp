import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../Loader";
import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../context/BookmarkListContext";

const BASE_GEOCODING_URL = "https://api-bdc.net/data/reverse-geocode-client";

function AddNewBookmark() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlLocation();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const { createBookmark } = useBookmark();

  useEffect(() => {
    if (!lat || !lng) {
      setCityName("");
      setCountry("");
      return;
    }

    async function fetchLocationData() {
      setIsLoadingGeoCoding(true);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );

        if (!data.countryCode)
          throw new Error(
            "this location is not valid! please click somewhere else"
          );

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        toast.error(error.message);
        setCityName("");
        setCountry("");
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }

    fetchLocationData();
  }, [lat, lng]);

  const backHandler = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!cityName || !country) return;

    const newBookmark = {
      cityName,
      country,
      latitude: lat,
      longitude: lng,
      host_location: cityName + " " + country,
      countryCode
    };

    await createBookmark(newBookmark);
    navigate("/bookmark")
  };

  if (isLoadingGeoCoding) return <Loader />;

  return (
    <div className="">
      <h2 className="font-bold text-xl">Bookmark new Location</h2>
      <form className="relative mb-4" onSubmit={submitHandler}>
        <div className="">
          <label htmlFor="cityName" className="block mb-1">
            CityName:
          </label>
          <input
            type="text"
            name="cityName"
            id="cityName"
            className="border p-2 rounded-lg w-full bg-slate-100"
            value={cityName}
            onChange={(event) => setCityName(event.target.value)}
          />
        </div>
        <div className="">
          <label htmlFor="countryName" className="block mb-1">
            Country:
          </label>
          <input
            type="text"
            name="countryName"
            id="countryName"
            className="border p-2 rounded-lg w-full bg-slate-100"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
          />
        </div>
        <span className="absolute right-4 top-2/4">
          <ReactCountryFlag svg countryCode={countryCode} />
        </span>
        <div className="flex items-center justify-between mt-4">
          <button
            className="px-4 py-2 rounded-lg border bg-zinc-200 hover:bg-zinc-300"
            onClick={backHandler}
          >
            &larr; Back
          </button>
          <button className="px-4 py-2 rounded-lg border bg-sky-800 text-white hover:bg-sky-900">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
