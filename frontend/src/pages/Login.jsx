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

      // Login using AuthContext
      login(response.data.user, response.data.token);

      alert(response.data.message);

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.detail || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-[#5D001E] mb-8">
          Login
        </h1>

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
          onClick={loginUser}
          className="w-full bg-[#5D001E] text-white py-3 rounded-lg hover:bg-[#7a0a2e]"
        >
          Login
        </button>

        <p className="mt-6 text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#5D001E] font-bold"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;