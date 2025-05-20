import { FcGoogle } from "react-icons/fc";
import mImage from "../assets/img.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";

const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const navigate = useNavigate();
  const user = useAppSelector((state:RootState)=>state.userSlice.user);
  const [loading,setLoading] = useState<boolean>(false);

  const handleSignup = async () => {
    setLoading(true);
    if (!username || !password || !email || !rePassword) {
      toast.error("Fill all fields");
      return;
    }

    if (password !== rePassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/signup", {
        username,
        email,
        password,
      });

      if (response.status === 200) {
        toast.success("Signup successful!");
        navigate("/login");
      }
    } catch (error: any) {
      console.log(error);
      console.log("Signup Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Signup failed");
    }finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
      if(user===null){
        navigate("/")
      }
    })

  return (
    <div className="w-full h-screen bg-primary flex items-center justify-center">
      <div className="w-[300px] sm:w-[400px] md:w-[1000px] h-[800px] flex flex-col items-center md:flex-row rounded-xl shadow-xl">
        <div className="w-full md:w-[400px] rounded-l-xl overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={mImage}
            alt="Background"
          />
        </div>
        <div className="w-[300px] sm:w-[400px] md:w-[600px] h-[90%] md:h-full bg-[#F7F7F7] rounded-r-xl p-10 flex flex-col justify-between">
          <div className="w-full text-center">
            <h1 className="text-2xl md:text-5xl font-bold text-gray-800 mb-5">Sign Up</h1>
            <p className="text-base md:text-lg text-gray-600">
              Create a new account to get started.
            </p>
          </div>

          <div className="w-full mt-6 mb-6">
            <div className="w-full h-10 md:h-14 bg-white rounded-lg flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <FcGoogle className="text-2xl mr-3" />
              <p className="text-sm md:text-lg font-semibold text-gray-700">
                Sign up with Google
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col space-y-3 md:space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Username
              </label>
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
                className="w-full h-8 md:h-12 px-1 md:px-4 placeholder:text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Email
              </label>
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                className="w-full h-8 md:h-12 px-1 md:px-4 rounded-lg placeholder:text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full h-8 md:h-12  px-1 md:px-4 placeholder:text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Re-Password
              </label>
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRePassword(e.target.value)
                }
                className="w-full h-8 md:h-12 px-1 md:px-4 placeholder:text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <div className="w-full mt-6">
          <button
              disabled={loading}
              onClick={handleSignup}
              className={`w-full h-10 md:h-12 text-center flex justify-center items-center bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300 ${
                loading
                  ? "bg-[#1AA34A] cursor-not-allowed opacity-75"
                  : "bg-[#1DB954] hover:bg-[#1AA34A]"
              }`}
            >
              {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Sign Up"
            )}
            </button>
          </div>
          <div className="w-full text-sm flex items-center pt-5 justify-center">
            <p className="text-gray-700">Already have an account?</p>
            <Link
              className="text-red-600 font-semibold ml-2 hover:text-red-700 transition-all duration-300"
              to="/login"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
