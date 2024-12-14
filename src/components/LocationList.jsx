import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "./Loader";

function LocationList() {
  const { data, isLoading } = useFetch("http://localhost:5000/hotels", "");

  if (isLoading) return <Loader />;

  return (
    <div className="">
      <h1 className="font-bold text-2xl min-[0px]:max-md:text-xl mb-4 min-[0px]:max-[555px]:text-center">
        Nearby Locations
      </h1>
      <div className="grid grid-rows-3 grid-cols-4 gap-5 juatify-center items-center min-[0px]:max-[555px]:grid-cols-1 min-[556px]:max-[873px]:grid-cols-2 min-[874px]:max-[1018px]:grid-cols-3">
        {data.map((loc) => {
          return (
            <Link
              key={loc.id}
              to={`/hotels/${loc.id}?lat=${loc.latitude}&lng=${loc.longitude}`}
            >
              <div className="flex flex-col">
                <img src={loc.thumbnail_url} alt={loc.name} />
                <h1 className="font-bold">{loc.smart_location}</h1>
                <p className="opacity-50 truncate text-sm">{loc.name}</p>
                <div className="flex justify-start items-center">
                  <span className="font-bold">$&nbsp;{loc.price}&nbsp;</span>
                  <p className="opacity-50">night</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default LocationList;
