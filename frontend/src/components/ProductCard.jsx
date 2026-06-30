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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 relative">

      <button
        onClick={addWishlist}
        className="absolute top-4 right-4 text-3xl"
      >
        ❤️
      </button>

      <img
        src={product.image}
        alt={product.name}
        className="w-full h-80 object-cover"
      />

      <div className="p-5">

        <h2 className="text-xl font-bold text-[#5D001E]">
          {product.name}
        </h2>

        <p className="text-gray-600 mt-2">
          {product.description}
        </p>

        <h3 className="text-2xl font-bold text-pink-600 mt-4">
          ₹{product.price}
        </h3>

        <Link to={`/product/${product._id}`}>
          <button className="mt-5 w-full bg-[#5D001E] text-white py-3 rounded-lg hover:bg-[#7a0a2e]">
            View Details
          </button>
        </Link>

      </div>

    </div>
  );
}

export default ProductCard;