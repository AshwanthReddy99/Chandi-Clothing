import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  const loginAdmin = () => {
    if (
      admin.email === "admin@chandi.com" &&
      admin.password === "admin123"
    ) {
      localStorage.setItem("admin", "true");

      alert("Admin Login Successful");

      navigate("/admin/dashboard");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-[#5D001E] mb-8">
          Admin Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Admin Email"
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
          onClick={loginAdmin}
          className="w-full bg-[#5D001E] text-white py-3 rounded-lg hover:bg-[#7a0a2e]"
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default AdminLogin;