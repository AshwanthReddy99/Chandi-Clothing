import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async () => {
    if (!user.email || !user.password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const response = await api.post("/login", user);

      login(response.data.user, response.data.token);

      alert(response.data.message);

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.detail || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5D001E] to-[#800020] flex items-center justify-center px-4 py-10">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8">

        <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#5D001E] mb-8">
          Welcome Back 👋
        </h1>

        <div className="space-y-5">

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#5D001E]"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#5D001E]"
          />

          <button
            onClick={loginUser}
            className="w-full bg-[#5D001E] hover:bg-[#7a0a2e] text-white py-3 rounded-xl text-lg font-semibold transition"
          >
            Login
          </button>

        </div>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?
        </p>

        <Link
          to="/register"
          className="block text-center mt-2 text-[#5D001E] font-bold hover:underline"
        >
          Create New Account
        </Link>

      </div>

    </div>
  );
}

export default Login;