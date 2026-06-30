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
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold text-[#5D001E] mb-10">
        My Wishlist ❤️
      </h1>

      {wishlist.length === 0 ? (
        <h2 className="text-2xl">
          Your wishlist is empty.
        </h2>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">

          {wishlist.map((item) => (
            <div
              key={item.product._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >

              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-full h-80 object-cover"
              />

              <div className="p-5">

                <h2 className="text-xl font-bold">
                  {item.product.name}
                </h2>

                <h3 className="text-pink-600 text-2xl font-bold mt-2">
                  ₹{item.product.price}
                </h3>

                <button
                  onClick={() => removeWishlist(item.product._id)}
                  className="mt-5 w-full bg-red-600 text-white py-3 rounded-lg"
                >
                  Remove ❤️
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Wishlist;