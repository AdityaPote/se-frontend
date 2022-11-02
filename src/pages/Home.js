import { useDispatch, useSelector } from "react-redux";
import { onLogout, checkAvailablitity } from "../features/seSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiLogout } from "react-icons/hi";
import Select from "react-select";
import AvailabilityCard from "../components/AvailabilityCard";

const quotas = [
  { value: "GN", label: "General" },
  { value: "tq", label: "Tatkal" },
];

const classes = [
  { value: "1A", label: "First AC" },
  { value: "2A", label: "Second AC" },
  { value: "3A", label: "Third AC" },
  { value: "FC", label: "First Class" },
  { value: "CC", label: "AC Chair Car" },
  { value: "SL", label: "Sleeper" },
  { value: "2S", label: "Second Sitting" },
];

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, checkAvailablitityResponse } = useSelector(
    (state) => state.se
  );

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  });

  const [values, setValues] = useState({
    fromStationCode: "",
    toStationCode: "",
    date: new Date().toISOString().slice(0, 10),
    quota: "",
    classType: "",
    trainNo: "",
  });

  const onClickCheckAvailability = async () => {
    dispatch(checkAvailablitity(values));
  };

  return (
    <section className="w-full min-h-screen">
      <div className="min-h-screen w-ful">
        <div className="max-w-[700px] m-auto flex flex-col items-center justify-between min-h-screen p-8 gap-4">
          <div className="w-full flex justify-between items-center">
            <p className="text-4xl font-bold">Book Ticket</p>
            <div
              onClick={() => dispatch(onLogout())}
              className="cursor-pointer"
            >
              <HiLogout size={25} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 w-full text-sm">
            <input type="text" className="min-w-14" placeholder="Train no" />
            <Select
              options={classes}
              placeholder="Class"
              className="min-w-14"
              value={values.classType}
              onChange={(e) => setValues({ ...values, classType: e.valueOf() })}
              components={{
                IndicatorSeparator: () => null,
                DropdownIndicator: () => null,
              }}
              styles={{
                singleValue: (provided, state) => ({
                  ...provided,
                  color: "white",
                }),
                option: (provided, state) => ({
                  ...provided,
                  color: "black",
                }),
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "rgb(39,39,42)",
                  padding: "0.35rem 0.1rem",
                  borderRadius: "0.75rem",
                  border: "2px solid rgb(63,63,70)",
                }),
              }}
            />
            <Select
              options={quotas}
              placeholder="Quota"
              className="min-w-14"
              value={values.quota}
              onChange={(e) => setValues({ ...values, quota: e.valueOf() })}
              components={{
                IndicatorSeparator: () => null,
                DropdownIndicator: () => null,
              }}
              styles={{
                singleValue: (provided, state) => ({
                  ...provided,
                  color: "white",
                }),
                // color of the dropdown menu options
                option: (provided, state) => ({
                  ...provided,
                  color: "black",
                }),
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "rgb(39,39,42)",
                  padding: "0.35rem 0.1rem",
                  borderRadius: "0.75rem",
                  border: "2px solid rgb(63,63,70)",
                }),
              }}
            />
            <input
              type="text"
              className="min-w-14"
              placeholder="From"
              value={values.fromStationCode}
              onChange={(e) =>
                setValues({ ...values, fromStationCode: e.target.value })
              }
            />
            <input
              type="text"
              className="min-w-14"
              placeholder="To"
              value={values.toStationCode}
              onChange={(e) =>
                setValues({ ...values, toStationCode: e.target.value })
              }
            />
            <input
              type="date"
              className="min-w-14"
              placeholder="Date"
              value={values.date}
              onChange={(e) => setValues({ ...values, date: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 mt-4 gap-4 w-full ">
            {checkAvailablitityResponse.map((availability) => {
              return <AvailabilityCard {...availability} />;
            })}
          </div>
          <button
            className="bg-white text-black w-full font-bold p-4 rounded-2xl hover:bg-slate-100"
            onClick={onClickCheckAvailability}
          >
            Check Availability
          </button>
        </div>
      </div>
    </section>
  );
};
export default Home;
