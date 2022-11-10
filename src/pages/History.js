import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getHistory } from "../features/seSlice";

const History = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { history, isLoggedIn } = useSelector((state) => state.se);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
    dispatch(getHistory());
  }, [dispatch, isLoggedIn, navigate]);

  return (
    <section className="w-full min-h-screen">
      <div className="min-h-screen w-full">
        <div className="max-w-[900px] m-auto flex flex-col items-center justify-between min-h-screen p-8 gap-4">
          <div className="w-full flex justify-between items-center">
            <p className="text-4xl font-bold">History</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
            {history.map((ticket, idx) => {
              return (
                <div key={idx} className="bg-white p-8 rounded-xl">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-semibold">Train No: </span>
                      {ticket.trainNo}
                    </div>
                    <div>
                      <span className="font-semibold">Date: </span>
                      {ticket.date}
                    </div>
                    <div>
                      <span className="font-semibold">From: </span>
                      {ticket.fromStationCode}
                    </div>
                    <div>
                      <span className="font-semibold">To: </span>
                      {ticket.toStationCode}
                    </div>
                    <div>
                      <span className="font-semibold">Class: </span>
                      {ticket.classType}
                    </div>
                    <div>
                      <span className="font-semibold">Passengers: </span>
                      {ticket.passengers.length}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default History;
