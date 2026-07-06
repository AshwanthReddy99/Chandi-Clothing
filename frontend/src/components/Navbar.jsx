import { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const isAdmin = localStorage.getItem("admin") === "true";

  const handleLogout = () => {
    logout();
    alert("Logged Out Successfully");
    navigate("/");
    setMenuOpen(false);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("admin");
    alert("Admin Logged Out Successfully");
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <nav className="bg-[#5D001E] text-white shadow-md">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 py-4">

        <h1 className="text-2xl md:text-3xl font-bold">
          <Link to="/">Chandi Clothing</Link>
        </h1>

        {/* Desktop Menu */}

        <ul className="hidden md:flex gap-8 items-center">

          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/sarees">Sarees</Link>
          </li>

          <li>
            <Link to="/contact">Contact</Link>
          </li>

          {isAdmin ? (
            <>
              <li>
                <Link to="/admin/dashboard">
                  Dashboard
                </Link>
              </li>

              <li>
                <button onClick={handleAdminLogout}>
                  Admin Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/admin/login">
                Admin
              </Link>
            </li>
          )}

          {user ? (
            <>
              <li>
                <Link to="/my-orders">
                  My Orders
                </Link>
              </li>

              <li>
                <Link to="/wishlist">
                  ❤️
                </Link>
              </li>

              <li className="text-yellow-300">
                Hi, {user.name}
              </li>

              <li>
                <button onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">
                  Login
                </Link>
              </li>

              <li>
                <Link to="/register">
                  Register
                </Link>
              </li>
            </>
          )}

          <li>
            <Link to="/cart" className="relative text-2xl">
              🛒

              {cart.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </Link>
          </li>

        </ul>

        {/* Mobile Menu Button */}

        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>

      {/* Mobile Menu */}

      {menuOpen && (

        <div className="md:hidden bg-[#5D001E] px-6 pb-5">

          <ul className="flex flex-col gap-5">

            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>

            <li>
              <Link to="/sarees" onClick={() => setMenuOpen(false)}>
                Sarees
              </Link>
            </li>

            <li>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            </li>

            {isAdmin ? (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>

                <li>
                  <button onClick={handleAdminLogout}>
                    Admin Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/admin/login"
                  onClick={() => setMenuOpen(false)}
                >
                  Admin
                </Link>
              </li>
            )}

            {user ? (
              <>
                <li>
                  <Link
                    to="/my-orders"
                    onClick={() => setMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                </li>

                <li>
                  <Link
                    to="/wishlist"
                    onClick={() => setMenuOpen(false)}
                  >
                    ❤️ Wishlist
                  </Link>
                </li>

                <li className="text-yellow-300">
                  Hi, {user.name}
                </li>

                <li>
                  <button onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>

                <li>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link
                to="/cart"
                onClick={() => setMenuOpen(false)}
              >
                🛒 Cart ({cart.length})
              </Link>
            </li>

          </ul>

        </div>

      )}

    </nav>
  );
}

export default Navbar;