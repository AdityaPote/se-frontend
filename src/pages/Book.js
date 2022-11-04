import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { onLogout } from "../features/seSlice";
import { HiLogout } from "react-icons/hi";

const Book = () => {
  const dispatch = useDispatch();
  const { selectedTrain, isLoggedIn } = useSelector((store) => store.se);

  if (
    !isLoggedIn ||
    (Object.keys(selectedTrain).length === 0 &&
      selectedTrain.constructor === Object)
  ) {
    return <Navigate to="/login" />;
  }

  const onClickLogout = async () => {
    dispatch(onLogout());
  };

  return (
    <section className="w-full min-h-screen">
      <div className="min-h-screen w-ful">
        <div className="max-w-[700px] m-auto flex flex-col items-center justify-between min-h-screen p-8 gap-4">
          <div className="w-full flex justify-between items-center">
            <p className="text-4xl font-bold">Confirm booking</p>
            <div onClick={onClickLogout} className="cursor-pointer">
              <HiLogout size={25} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Book;
