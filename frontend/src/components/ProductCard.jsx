import { Link } from "react-router-dom";
import api from "../services/api";

function ProductCard({ product }) {
  const addWishlist = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please Login First");
        return;
      }

      await api.post("/wishlist", {
        email: user.email,
        product: product,
      });

      alert("❤️ Added to Wishlist");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden relative">

      <button
        onClick={addWishlist}
        className="absolute top-3 right-3 text-2xl hover:scale-110 transition"
      >
        ❤️
      </button>

      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 sm:h-72 md:h-80 object-cover"
      />

      <div className="p-4 sm:p-5">

        <h2 className="text-lg sm:text-xl font-bold text-[#5D001E]">
          {product.name}
        </h2>

        <p className="text-gray-600 mt-2 text-sm sm:text-base line-clamp-2">
          {product.description}
        </p>

        <h3 className="text-xl sm:text-2xl font-bold text-pink-600 mt-4">
          ₹{product.price}
        </h3>

        <Link to={`/product/${product._id}`}>
          <button className="mt-5 w-full bg-[#5D001E] text-white py-3 rounded-lg hover:bg-[#7a0a2e] transition">
            View Details
          </button>
        </Link>

      </div>

    </div>
  );
}

export default ProductCard;