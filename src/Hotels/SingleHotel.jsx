import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useHotels } from "../components/context/HotelsProvider";
import { useEffect } from "react";

function SingleHotel() {
  const { id } = useParams();
  const { getHotel, isLoadingCurrentHotel, currentHotel } = useHotels();

  useEffect(() => {
    getHotel(id);
  }, [id, getHotel]);

  if (isLoadingCurrentHotel)  <Loader />;

  return (
    <>
      <h1 className="font-bold text-lg">{currentHotel.name}</h1>
      <div className="mb-3 text-sm">
        {currentHotel.number_of_reviews} reviews &bull;{" "}
        {currentHotel.smart_location}
      </div>
      <img
        src={currentHotel.thumbnail_url}
        alt={currentHotel.name}
        className="rounded-3xl w-80 min-[0px]:max-[800px]:w-auto"
      />
    </>
  );
}

export default SingleHotel;
