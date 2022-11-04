import { useDispatch, useSelector } from "react-redux";
import { onLogout, checkAvailablitity } from "../features/seSlice";
import { useEffect, useState } from "react";
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

  const [searchValues, setsearchValues] = useState({
    fromStationCode: "",
    toStationCode: "",
    date: new Date().toISOString().slice(0, 10),
    trainNo: "",
  });
  const [quota, setQuota] = useState("");
  const [classType, setClassType] = useState("");

  const onChange = (e) => {
    setsearchValues({ ...searchValues, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const onClickCheckAvailability = () => {
    dispatch(checkAvailablitity({ ...searchValues, quota, classType }));
  };

  const onClickLogout = async () => {
    dispatch(onLogout());
  };

  return (
    <section className="w-full min-h-screen">
      <div className="min-h-screen w-ful">
        <div className="max-w-[700px] m-auto flex flex-col items-center justify-between min-h-screen p-8 gap-4">
          <div className="w-full flex justify-between items-center">
            <p className="text-4xl font-bold">Book Ticket</p>
            <div onClick={onClickLogout} className="cursor-pointer">
              <HiLogout size={25} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 w-full text-sm">
            <input
              type="text"
              className="min-w-14"
              placeholder="Train no"
              name="trainNo"
              value={searchValues.trainNo}
              onChange={onChange}
            />
            <Select
              options={classes}
              placeholder="Class"
              className="min-w-14"
              name="classType"
              value={classType}
              onChange={setClassType}
              components={{
                IndicatorSeparator: () => null,
                DropdownIndicator: () => null,
              }}
              styles={{
                singleValue: (provided) => ({
                  ...provided,
                  color: "white",
                }),
                option: (provided) => ({
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
              name="quota"
              value={quota}
              onChange={setQuota}
              components={{
                IndicatorSeparator: () => null,
                DropdownIndicator: () => null,
              }}
              styles={{
                singleValue: (provided) => ({
                  ...provided,
                  color: "white",
                }),
                option: (provided) => ({
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
              name="fromStationCode"
              value={searchValues.fromStationCode}
              onChange={onChange}
            />
            <input
              type="text"
              className="min-w-14"
              placeholder="To"
              name="toStationCode"
              value={searchValues.toStationCode}
              onChange={onChange}
            />
            <input
              type="date"
              className="min-w-14"
              placeholder="Date"
              name="date"
              value={searchValues.date}
              onChange={onChange}
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 mt-4 gap-4 w-full ">
            {checkAvailablitityResponse.map((availability, idx) => {
              return <AvailabilityCard {...availability} key={idx} />;
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
