import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import Loading from "./pages/Loading";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import Book from "./pages/Book";
import Success from "./pages/Success";
import History from "./pages/History";

const App = () => {
  const { isLoading, isError, errorMessage } = useSelector((state) => state.se);

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage, {
        duration: 1000,
      });
    }
  }, [errorMessage, isError]);

  if (isLoading) return <Loading />;

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book" element={<Book />} />
        <Route path="/success" element={<Success />} />
        <Route path="/history" element={<History />} />
      </Routes>
      <Toaster />
    </div>
  );
};
export default App;
