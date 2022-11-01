import { useEffect, useState } from "react";

const AvailabilityCard = ({ total_fare, date, current_status }) => {
  const [canBook, setCanBook] = useState(false);
  let style;

  if (current_status.toLowerCase().includes("not available")) {
    style =
      "bg-red-500 text-white min-w-14 p-4 rounded-xl flex flex-col justify-between gap-2 font-semibold";
  } else if (current_status.toLowerCase().includes("available")) {
    style =
      "bg-green-500 text-white min-w-14 p-4 rounded-xl flex flex-col justify-between gap-2 font-semibold";
  } else {
    style =
      "bg-yellow-500 text-white min-w-14 p-4 rounded-xl flex flex-col justify-between gap-2 font-semibold";
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
      <p>{current_status}</p>
      {canBook && (
        <button className="px-1 py-2 bg-gray-50 rounded-xl text-black font-semibold hover:bg-slate-100">
          Book
        </button>
      )}
    </div>
  );
};
export default AvailabilityCard;
