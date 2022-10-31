import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { continueWithGoogle } from "../features/seSlice";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.se);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <section className="w-full h-screen">
      <div className="p-8 h-full">
        <div className="max-w-[700px] m-auto h-full flex flex-col items-center justify-between">
          {/* Top three lines */}
          <div className="w-full">
            <p className="font-bold text-4xl">Let's register you.</p>
            <div className="mt-5">
              <p className="my-2 text-3xl">Welcome.</p>
              <p className="my-2 text-3xl">To your new home!</p>
            </div>
          </div>
          {/* Register form */}
          <form className="flex flex-col gap-4 items-center w-full">
            <input
              type="text"
              placeholder="Name"
              className="w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="flex flex-col items-center justify-center">
              <p className="text-xl mt-2">Or continue with</p>
              <div
                className="bg-zinc-800 py-3 px-4 rounded-xl border-solid border-2 border-zinc-700 mt-3 cursor-pointer"
                onClick={() => dispatch(continueWithGoogle())}
              >
                <FcGoogle size={25} />
              </div>
            </div>
          </form>
          {/* Register button */}
          <div className="w-full text-center">
            <p>
              Already have an account?{" "}
              <button
                className="font-bold"
                on
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </p>
            <button className="bg-white text-black w-full mt-4 font-bold p-4 rounded-2xl hover:bg-slate-100">
              Register
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
