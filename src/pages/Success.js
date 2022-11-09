import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const { selectedTrain } = useSelector((state) => state.se);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, [navigate, selectedTrain]);

  return (
    <section className="w-full min-h-screen">
      <div className="min-h-screen w-ful">
        <div className="max-w-[900px] m-auto flex flex-col items-center justify-between min-h-screen p-8 gap-4">
          <div className="w-full flex justify-between items-center">
            <p className="text-4xl font-bold">Ticket booked successfully!</p>
          </div>
          <div>Redirecting...</div>
        </div>
      </div>
    </section>
  );
};

export default Success;
