import { useEffect, useState } from "react";
import api from "../services/api";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      const response = await api.get(`/wishlist/${user.email}`);

      setWishlist(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeWishlist = async (productId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await api.delete(`/wishlist/${user.email}/${productId}`);

      fetchWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-10 py-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#5D001E] mb-10 text-center">
          My Wishlist ❤️
        </h1>

        {wishlist.length === 0 ? (

          <div className="bg-white rounded-xl shadow-lg p-10 text-center">

            <h2 className="text-xl sm:text-2xl font-semibold text-gray-600">
              Your wishlist is empty.
            </h2>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {wishlist.map((item) => (

              <div
                key={item.product._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
              >

                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-72 sm:h-80 object-cover"
                />

                <div className="p-5">

                  <h2 className="text-xl font-bold text-[#5D001E]">
                    {item.product.name}
                  </h2>

                  <p className="text-gray-600 mt-3 line-clamp-2">
                    {item.product.description}
                  </p>

                  <h3 className="text-2xl font-bold text-pink-600 mt-4">
                    ₹{item.product.price}
                  </h3>

                  <button
                    onClick={() => removeWishlist(item.product._id)}
                    className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
                  >
                    Remove ❤️
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Wishlist;