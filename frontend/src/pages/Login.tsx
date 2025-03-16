import { FcGoogle } from "react-icons/fc";
import mImage from "../assets/img.jpg";
import { Link } from "react-router-dom";


const Login = () => {
  return (
    <div className="w-full h-screen bg-primary flex items-center justify-center">
      <div className="w-[1000px] h-[800px] flex rounded-xl shadow-xl">
        <div className="w-[400px] h-full rounded-l-xl overflow-hidden">
          <img className="w-full h-full object-cover" src={mImage} alt="Background" />
        </div>
        <div className="w-[600px] h-full bg-[#F7F7F7] rounded-r-xl p-10 flex flex-col ">
          <div className="w-full text-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-5">Login</h1>
            <p className="text-lg text-gray-600">Login to see content</p>
          </div>
          

          <div className="w-full mt-6 mb-6">
            <div className="w-full h-14 bg-white rounded-lg flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <FcGoogle className="text-2xl mr-3" />
              <p className="text-lg font-semibold text-gray-700">Login with Google</p>
            </div>
          </div>

          <div className="w-full flex flex-col space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
              <input
                className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
              <input
                className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="w-full mt-10">
            <button className="w-full h-12 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300">
              Create Account
            </button>
          </div>
          <div className="w-full text-sm flex items-center pt-9 justify-center">
            <p className="text-gray-700">You don't have an account?</p>
            <Link
              className="text-red-600 font-semibold ml-2 hover:text-red-700 transition-all duration-300"
              to="/signup"
            >
              Signup
            </Link>
          </div>

          <div className="w-full text-sm flex items-center pt-10 justify-center">
            <p className="text-gray-700"><Link
              className="text-red-600 font-semibold ml-2 hover:text-red-700 transition-all duration-300"
              to="/"
            >
              Continue
            </Link> without creating an account</p>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login
