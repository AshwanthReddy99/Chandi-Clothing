import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async () => {
    if (!user.name || !user.email || !user.password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const response = await api.post("/register", user);

      alert(response.data.message);

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.detail || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5D001E] to-[#800020] flex items-center justify-center px-4 py-10">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8">

        <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#5D001E] mb-8">
          Create Account ✨
        </h1>

        <div className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#5D001E]"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#5D001E]"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#5D001E]"
          />

          <button
            onClick={registerUser}
            className="w-full bg-[#5D001E] hover:bg-[#7a0a2e] text-white py-3 rounded-xl text-lg font-semibold transition"
          >
            Register
          </button>

        </div>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?
        </p>

        <Link
          to="/login"
          className="block text-center mt-2 text-[#5D001E] font-bold hover:underline"
        >
          Login Here
        </Link>

      </div>

    </div>
  );
}

export default Register;