import { Outlet } from "react-router-dom";
import Map from "../../Map/Map";
import { useHotels } from "../context/HotelsProvider";

function HotelLayout() {
  const { hotels } = useHotels();
  return (
    <div className="grid grid-cols-2 gap-4 min-[0px]:max-[800px]:grid-cols-1">
      <div className="flex flex-col">
        <Outlet />
      </div>
      <Map markerLocations={hotels} />
    </div>
  );
}

export default HotelLayout;
