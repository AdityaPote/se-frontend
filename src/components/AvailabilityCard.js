import { useEffect, useState } from "react";

const AvailabilityCard = (props) => {
  const { total_fare, date, current_status } = props;

  const [canBook, setCanBook] = useState(false);
  let style;

  if (current_status.toLowerCase().includes("not available")) {
    style =
      "bg-red-800 text-white min-w-14 p-4 rounded-xl flex flex-col justify-between gap-2 font-semibold hover:scale-105 transform transition duration-300 ease-in-out";
  } else if (current_status.toLowerCase().includes("available")) {
    style =
      "bg-green-800 text-white min-w-14 p-4 rounded-xl flex flex-col justify-between gap-2 font-semibold hover:scale-105 transform transition duration-300 ease-in-out";
  } else {
    style =
      "bg-yellow-700 text-white min-w-14 p-4 rounded-xl flex flex-col justify-between gap-2 font-semibold hover:scale-105 transform transition duration-300 ease-in-out";
  }

  useEffect(() => {
    if (current_status.toLowerCase().includes("not available")) {
      setCanBook(false);
    } else {
      setCanBook(true);
    }
  }, [current_status]);

  return (
    <div className={`${style}`}>
      <p>{date}</p>
      <p>Fare: ₹{total_fare}</p>
      <p>{current_status.substr(0, current_status.length - 1)}</p>
      {canBook && (
        <button className="px-1 py-2 bg-gray-50 rounded-xl text-black font-semibold hover:bg-slate-100">
          Book
        </button>
      )}
    </div>
  );
};
export default AvailabilityCard;
