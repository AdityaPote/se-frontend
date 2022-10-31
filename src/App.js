import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import Loading from "./pages/Loading";

const App = () => {
  const { isLoading } = useSelector((state) => state.se);

  if (isLoading) return <Loading />;

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};
export default App;
