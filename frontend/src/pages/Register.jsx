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
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-[#5D001E] mb-8">
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-6"
        />

        <button
          onClick={registerUser}
          className="w-full bg-[#5D001E] text-white py-3 rounded-lg hover:bg-[#7a0a2e]"
        >
          Register
        </button>

        <p className="mt-6 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#5D001E] font-bold"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;