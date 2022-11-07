import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onLogout, resetValues } from "../features/seSlice";
import { HiLogout, HiLockClosed, HiPlus, HiTrash } from "react-icons/hi";
import { useEffect } from "react";
import { useState } from "react";

const Book = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedTrain, isLoggedIn } = useSelector((store) => store.se);
  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
    if (
      Object.keys(selectedTrain).length === 0 &&
      selectedTrain.constructor === Object
    ) {
      navigate("/");
    }

    return () => {
      dispatch(resetValues());
    };
  }, [dispatch, isLoggedIn, navigate, selectedTrain]);

  const onClickLogout = async () => {
    dispatch(onLogout());
  };

  const {
    classType,
    // current_status,
    date,
    fromStationCode,
    quota,
    toStationCode,
    total_fare,
    trainNo,
  } = selectedTrain;

  const handleOnClickAdd = () => {
    setInputs([...inputs, { name: "", age: "", gender: "" }]);
  };

  const onChangeInput = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputs];
    list[index][name] = value;
    setInputs(list);
  };

  const handleOnClickRemove = (index) => {
    let copyInputs = [...inputs];
    copyInputs = copyInputs.filter((_, idx) => {
      return idx !== index;
    });
    setInputs(copyInputs);
  };

  return (
    <section className="w-full min-h-screen">
      <div className="min-h-screen w-ful">
        <div className="max-w-[900px] m-auto flex flex-col items-center justify-start min-h-screen p-8 gap-4">
          <div className="w-full flex justify-between items-center">
            <p className="text-4xl font-bold">Confirm booking</p>
            <div onClick={onClickLogout} className="cursor-pointer">
              <HiLogout size={25} />
            </div>
          </div>
          <div className="grid grid-cols-[1fr,auto] bg-white text-black p-8 rounded-xl font-semibold w-full gap-4">
            <div>
              Train No: <span className="font-medium">{trainNo}</span>
            </div>
            <div>
              Date: <span className="font-medium">{date}</span>
            </div>
            <div>
              From: <span className="font-medium">{fromStationCode}</span>
            </div>
            <div>
              To: <span className="font-medium">{toStationCode}</span>
            </div>
            <div>
              Quota: <span className="font-medium">{quota}</span>
            </div>
            <div>
              Class: <span className="font-medium">{classType}</span>
            </div>
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="text-md font-semibold">Add Passengers</div>
            <div>
              <HiPlus onClick={handleOnClickAdd} className="cursor-pointer" />
            </div>
          </div>
          <div className="grid gap-4 grid-cols-1 w-full">
            {inputs.map((input, idx) => {
              return (
                <div
                  className="w-full flex gap-2 m-auto justify-between items-center"
                  key={idx}
                >
                  <input
                    placeholder="Name"
                    className="grow"
                    name="name"
                    value={input.name}
                    onChange={(e) => onChangeInput(e, idx)}
                  />
                  <input
                    placeholder="Age"
                    className="grow"
                    name="age"
                    value={input.age}
                    onChange={(e) => onChangeInput(e, idx)}
                  />
                  <input
                    placeholder="Gender"
                    className="grow"
                    name="gender"
                    value={input.gender}
                    onChange={(e) => onChangeInput(e, idx)}
                  />
                  <div className="m-auto">
                    <HiTrash
                      className="cursor-pointer"
                      onClick={() => handleOnClickRemove(idx)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <button className="bg-white text-black w-full font-bold p-4 rounded-2xl hover:bg-slate-100 align-bottom mt-auto">
            <div className="flex justify-center items-center gap-2">
              Pay ₹{total_fare} <HiLockClosed />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Book;
