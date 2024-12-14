import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { useHotels } from "../components/context/HotelsProvider";

function Hotels() {
  const { isLoading, hotels, currentHotel } = useHotels();
  if (isLoading) return <Loader />;

  return (
    <>
      <h1 className="font-bold text-lg mb-1">
        Search Results: ({hotels.length})
      </h1>
      <div className="flex flex-col justify-center gap-4">
        {hotels.map((item) => (
          <SearchLoc item={item} key={item.id} currentHotel={currentHotel} />
        ))}
      </div>
    </>
  );
}

export default Hotels;

function SearchLoc({ item, currentHotel }) {
  return (
    <Link
      key={item.id}
      to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
    >
      <div
        className={`flex gap-2 ${
          item.id === currentHotel.id
            ? "border-2 border-sky-700 bg-slate-200 rounded-s-3xl"
            : ""
        }`}
      >
        <img
          src={item.thumbnail_url}
          alt={item.name}
          className="rounded-3xl min-[0px]:max-[980px]:w-36"
        />
        <div className="flex flex-col">
          <h1 className="font-bold">{item.smart_location}</h1>
          <p className="opacity-50 overflow-hidden whitespace-normal text-ellipsis text-sm">
            {item.name}
          </p>
          <div className="flex justify-start items-center">
            <span className="font-bold">$&nbsp;{item.price}&nbsp;</span>
            <p className="opacity-50">night</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
