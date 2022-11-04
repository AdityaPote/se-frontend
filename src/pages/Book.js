import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Book = () => {
  const { selectedTrain } = useSelector((store) => store.se);

  if (
    Object.keys(selectedTrain).length === 0 &&
    selectedTrain.constructor === Object
  ) {
    return <Navigate to="/" />;
  }
  return <div>Book</div>;
};
export default Book;
