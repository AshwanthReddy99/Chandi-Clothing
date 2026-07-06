import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import api from "../services/api";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/product/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleWhatsApp = () => {
    const phoneNumber = "919398383655";

    const message = `Hi Chandi Clothing 👋

I want to order this saree.

🛍 Product: ${product.name}

💰 Price: ₹${product.price}

📦 Quantity: ${quantity}

🔗 Product Link:
${window.location.href}

Please let me know if it is available.`;

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank");
  };

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Loading Product...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-10 py-8">

      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-8">

          {/* Image */}

          <div className="flex justify-center">

            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-md lg:max-w-full h-[350px] sm:h-[500px] lg:h-[650px] object-cover rounded-xl"
            />

          </div>

          {/* Product Details */}

          <div className="flex flex-col justify-center">

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#5D001E]">
              {product.name}
            </h1>

            <h2 className="text-2xl sm:text-3xl font-bold text-pink-600 mt-5">
              ₹{product.price}
            </h2>

            <p className="mt-6 text-base sm:text-lg text-gray-700 leading-7 sm:leading-8">
              {product.description}
            </p>

            {/* Quantity */}

            <div className="mt-8">

              <h3 className="text-lg sm:text-xl font-semibold mb-4">
                Quantity
              </h3>

              <div className="flex items-center gap-4">

                <button
                  onClick={() =>
                    quantity > 1 && setQuantity(quantity - 1)
                  }
                  className="bg-gray-300 hover:bg-gray-400 w-12 h-12 rounded-lg text-2xl font-bold"
                >
                  -
                </button>

                <span className="text-2xl font-bold">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-gray-300 hover:bg-gray-400 w-12 h-12 rounded-lg text-2xl font-bold"
                >
                  +
                </button>

              </div>

            </div>

            {/* Buttons */}

            <button
              onClick={() =>
                addToCart({
                  ...product,
                  quantity,
                })
              }
              className="mt-10 w-full bg-[#5D001E] hover:bg-[#7a0a2e] text-white py-4 rounded-xl text-lg font-semibold transition"
            >
              🛒 Add To Cart
            </button>

            <button
              onClick={handleWhatsApp}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-semibold transition"
            >
              💬 Chat on WhatsApp
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;