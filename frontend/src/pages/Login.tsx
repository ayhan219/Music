import { FcGoogle } from "react-icons/fc";
import mImage from "../assets/img.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getUser } from "../features/UserSlice";
import { RootState } from "../app/store";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state: RootState) => state.userSlice.user);
  const [loading,setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setLoading(true);
    if (!email || !password) {
      toast.error("fill all area");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("login successfull");
        dispatch(getUser());
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);
      console.log("Signup Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "login failed");
    }finally{
      setLoading(true);
    }
  };

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }

  },[]);

  return (
    <div className="w-full h-screen bg-primary flex items-center justify-center">
      <div className="w-[300px] sm:w-[400px] md:w-[1000px] h-[800px] flex flex-col items-center md:flex-row rounded-xl shadow-xl">
        <div className="w-full md:w-[400px] h-full rounded-l-xl overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={mImage}
            alt="Background"
          />
        </div>
        <div className="w-[300px] sm:w-[400px] md:w-[600px] h-[70%] md:h-full bg-[#F7F7F7] rounded-r-xl p-10 flex flex-col ">
          <div className="w-full text-center">
            <h1 className="text-2xl md:text-5xl font-bold text-gray-800 mb-5">Login</h1>
            <p className="text-base md:text-lg text-gray-600">Login to see content</p>
          </div>

          <div className="w-full mt-6 mb-6">
            <div
              onClick={() => {
                window.location.href = "http://localhost:5000/auth/google";
              }}
              className="w-full h-10 md:h-14 bg-white rounded-lg flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <FcGoogle className="text-2xl mr-3" />
              <p className="text-sm md:text-lg font-semibold text-gray-700">
                Login with Google
              </p>
            </div>
          </div>

          <div className="w-full flex  flex-col space-y-3 md:space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Email
              </label>
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                className="w-full h-8 md:h-12 px-1 md:px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Password
              </label>
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                className="w-full h-8 md:h-12 px-1 md:px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="w-full mt-10">
            <button
              disabled={loading}
              onClick={handleLogin}
              className={`w-full h-10 md:h-12 text-center flex justify-center items-center bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300 ${
                loading
                  ? "bg-[#1AA34A] cursor-not-allowed opacity-75"
                  : "bg-[#1DB954] hover:bg-[#1AA34A]"
              }`}
            >
              {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Login"
            )}
            </button>
          </div>
          <div className="w-full text-xs md:text-sm  flex items-center pt-9 justify-center">
            <p className="text-gray-700">You don't have an account?</p>
            <Link
              className="text-red-600 font-semibold ml-2 hover:text-red-700 transition-all duration-300"
              to="/signup"
            >
              Signup
            </Link>
          </div>

          <div className="w-full text-xs md:text-sm flex flex-col md:flex-row items-center pt-5 md:pt-10 justify-center">
            <p className="text-gray-700">
              <Link
                className="text-red-600 font-semibold ml-2 hover:text-red-700 transition-all duration-300"
                to="/"
              >
                Continue
              </Link>{" "}
              without creating an account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
