import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const isAdmin = localStorage.getItem("admin") === "true";

  const handleLogout = () => {
    logout();
    alert("Logged Out Successfully");
    navigate("/");
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("admin");
    alert("Admin Logged Out Successfully");
    navigate("/");
  };

  return (
    <nav className="bg-[#5D001E] text-white px-8 py-4 flex justify-between items-center">

      <h1 className="text-3xl font-bold">
        <Link to="/">Chandi Clothing</Link>
      </h1>

      <ul className="flex gap-8 items-center">

        <li>
          <Link to="/" className="hover:text-yellow-300">
            Home
          </Link>
        </li>

        <li>
          <Link to="/sarees" className="hover:text-yellow-300">
            Sarees
          </Link>
        </li>

        <li>
          <Link to="/contact" className="hover:text-yellow-300">
            Contact
          </Link>
        </li>

        {/* Admin */}
        {isAdmin ? (
          <>
            <li>
              <Link
                to="/admin/dashboard"
                className="hover:text-yellow-300 font-semibold"
              >
                Dashboard
              </Link>
            </li>

            <li>
              <button
                onClick={handleAdminLogout}
                className="hover:text-yellow-300"
              >
                Admin Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link
              to="/admin/login"
              className="hover:text-yellow-300 font-semibold"
            >
              Admin
            </Link>
          </li>
        )}

        {/* Customer */}
        {user ? (
          <>
            <li>
              <Link to="/my-orders" className="hover:text-yellow-300">
                My Orders
              </Link>
            </li>

            <li>
              <Link
                to="/wishlist"
                className="hover:text-yellow-300 text-2xl"
                title="Wishlist"
              >
                ❤️
              </Link>
            </li>

            <li className="text-yellow-300 font-semibold">
              👋 Hi, {user.name}
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="hover:text-yellow-300"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="hover:text-yellow-300">
                Login
              </Link>
            </li>

            <li>
              <Link to="/register" className="hover:text-yellow-300">
                Register
              </Link>
            </li>
          </>
        )}

        {/* Cart */}
        <li>
          <Link
            to="/cart"
            className="relative hover:text-yellow-300 text-2xl"
          >
            🛒

            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {cart.length}
              </span>
            )}
          </Link>
        </li>

      </ul>
    </nav>
  );
}

export default Navbar;