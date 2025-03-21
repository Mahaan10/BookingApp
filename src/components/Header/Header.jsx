import { useRef, useState } from "react";
import { HiCalendar, HiSearch } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import { BiLogOut, BiMinus, BiPlus } from "react-icons/bi";
import useOutsideClick from "../../hooks/useOutsideClick";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { createSearchParams, NavLink, useNavigate } from "react-router-dom";

function Header() {
  const [destination, setDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const [openDate, setOpenDate] = useState(false);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const navigate = useNavigate();

  const optionsHandler = (name, operation) => {
    setOptions((prevOptions) => {
      return {
        ...prevOptions,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const searchHandler = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      options: JSON.stringify(options),
      destination,
    });
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };
  return (
    <>
      <div className="w-10/12 mx-auto mt-5 min-[0px]:max-md:w-full">
        <div className="border border-gray-100 rounded-2xl flex justify-around items-center py-4 min-[0px]:max-[555px]:flex-wrap min-[0px]:max-[555px]:gap-4">
          <div className="">
            <NavLink to="/">Home</NavLink>
          </div>
          <span className="border-r border-gray-400 min-[0px]:max-[555px]:hidden">
            &nbsp;
          </span>
          <div className="">
            <NavLink to="/bookmark">Bookmarks</NavLink>
          </div>
          <span className="border-r border-gray-400 min-[0px]:max-[555px]:hidden">
            &nbsp;
          </span>
          <div className="flex justify-center items-center min-[0px]:max-[555px]:w-full gap-1">
            <MdLocationOn className="text-red-700" />
            <input
              type="text"
              placeholder="where to go ?"
              name="destination"
              id="destination"
              className="border-none focus:outline-none min-[0px]:max-[555px]:w-11/12"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <span className="border-r border-gray-400 min-[0px]:max-[555px]:hidden">
            &nbsp;
          </span>
          <div className="flex items-center justify-center min-[0px]:max-[555px]:w-11/12 relative">
            <div
              className="flex justify-center items-center"
              onClick={() => {
                setOpenDate(!openDate);
                setOpenOptions(false);
              }}
            >
              <HiCalendar className="text-blue-800" />
              <div className="min-[0px]:max-md:text-sm">
                {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}
              </div>
            </div>
            <div
              className={`absolute w-full top-8 ${
                openDate ? "inline-block" : "hidden"
              }`}
              style={{ zIndex: 2000 }}
            >
              <DateRange
                ranges={date}
                onChange={(date) => setDate([date.selection])}
                minDate={new Date()}
                moveRangeOnFirstSelection={true}
              />
            </div>
          </div>
          <span className="border-r border-gray-400 min-[0px]:max-[555px]:hidden">
            &nbsp;
          </span>
          <div
            className={`min-[0px]:max-md:text-sm min-[0px]:max-[555px]:w-11/12 min-[0px]:max-[555px]:text-center cursor-pointer relative`}
          >
            <div
              id="openOptions"
              onClick={() => {
                setOpenOptions(!openOptions);
                setOpenDate(false);
              }}
            >
              {options.adult} adult &bull; {options.children} children &bull;{" "}
              {options.room} room
            </div>

            <div
              className={`absolute w-full top-6 left-0 bg-white ${
                openOptions ? `inline-block` : "hidden"
              }`}
              style={{ zIndex: 2000 }}
            >
              <GuestOptionList
                options={options}
                optionsHandler={optionsHandler}
                setOpenOptions={setOpenOptions}
              />
            </div>
          </div>
          <div className="min-[0px]:max-[555px]:w-11/12">
            <button
              className={`bg-sky-700 text-3xl text-white rounded-xl min-[0px]:max-[555px]:text-3xl min-[0px]:max-[555px]:w-full`}
              onClick={searchHandler}
            >
              <HiSearch className="p-1 min-[0px]:max-[555px]:w-11/12" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;

function GuestOptionList({ options, optionsHandler, setOpenOptions }) {
  const optionsRef = useRef();
  useOutsideClick(optionsRef, "openOptions", () => setOpenOptions(false));
  return (
    <div
      className="rounded-xl shadow-lg flex flex-col mt-2 gap-4 p-2"
      ref={optionsRef}
    >
      <OptionItem
        type="adult"
        options={options}
        minLimit={1}
        optionsHandler={optionsHandler}
      />
      <OptionItem
        type="children"
        options={options}
        minLimit={0}
        optionsHandler={optionsHandler}
      />
      <OptionItem
        type="room"
        options={options}
        minLimit={1}
        optionsHandler={optionsHandler}
      />
    </div>
  );
}

function OptionItem({ options, type, minLimit, optionsHandler }) {
  return (
    <div className="flex justify-between items-center mt-1">
      <p className="">{type}</p>
      <div className="flex justify-between items-center gap-2">
        <button
          className="bg-gray-100 hover:bg-gray-200 p-1"
          onClick={() => optionsHandler(type, "dec")}
          disabled={options[type] <= minLimit}
        >
          <BiMinus className="" />
        </button>
        <p>{options[type]}</p>
        <button
          className="bg-gray-100 hover:bg-gray-200 p-1"
          onClick={() => optionsHandler(type, "inc")}
        >
          <BiPlus />
        </button>
      </div>
    </div>
  );
}
