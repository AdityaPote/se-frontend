import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetValues } from "../features/seSlice";

const Ticket = () => {
  const dispatch = useDispatch();
  const { selectedTicket } = useSelector((state) => state.se);
  const { passengers } = selectedTicket;

  useEffect(() => {
    return () => {
      dispatch(resetValues());
    };
  }, [dispatch]);

  return (
    <section className="w-full min-h-screen">
      <div className="min-h-screen w-ful">
        <div className="max-w-[900px] m-auto flex flex-col items-center min-h-screen p-8 gap-4">
          <div className="w-full flex justify-between items-center">
            <p className="text-4xl font-bold">Ticket details</p>
          </div>
          <div className="bg-white text-back rounded-xl grid grid-cols-[1fr,auto] w-full text-black p-8 gap-4">
            <div>
              <span className="font-semibold">Train No: </span>
              {selectedTicket.trainNo}
            </div>
            <div>
              <span className="font-semibold">Date: </span>
              {selectedTicket.date}
            </div>
            <div>
              <span className="font-semibold">From: </span>
              {selectedTicket.fromStationCode}
            </div>
            <div>
              <span className="font-semibold">To: </span>
              {selectedTicket.toStationCode}
            </div>
            <div>
              <span className="font-semibold">Class: </span>
              {selectedTicket.classType}
            </div>
            <div>
              <span className="font-semibold">Quota: </span>
              {selectedTicket.quota}
            </div>
            <div className="col-span-2">
              <div className="font-medium text-xl mb-4">
                Passenger details:{" "}
              </div>
              <div className="grid grid-cols-[1fr,auto] gap-4">
                {passengers.map((passenger, idx) => {
                  return (
                    <React.Fragment key={idx}>
                      <div>
                        <span className="font-semibold">Name: </span>
                        {passenger.name}
                      </div>
                      <div>
                        <span className="font-semibold">Age: </span>
                        {passenger.age}
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ticket;
