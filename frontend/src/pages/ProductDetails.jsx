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
        <h1 className="text-3xl font-bold">Loading Product...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 bg-white p-8 rounded-xl shadow-lg">

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[600px] object-cover rounded-xl"
        />

        <div>

          <h1 className="text-5xl font-bold text-[#5D001E]">
            {product.name}
          </h1>

          <h2 className="text-3xl font-bold text-pink-600 mt-6">
            ₹{product.price}
          </h2>

          <p className="mt-8 text-lg text-gray-700 leading-8">
            {product.description}
          </p>

          {/* Quantity */}

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-3">
              Quantity
            </h3>

            <div className="flex items-center gap-5">

              <button
                onClick={() =>
                  quantity > 1 && setQuantity(quantity - 1)
                }
                className="bg-gray-300 px-5 py-2 rounded-lg text-2xl"
              >
                -
              </button>

              <span className="text-2xl font-bold">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="bg-gray-300 px-5 py-2 rounded-lg text-2xl"
              >
                +
              </button>

            </div>
          </div>

          {/* Add To Cart */}

          <button
            onClick={() =>
              addToCart({
                ...product,
                quantity,
              })
            }
            className="mt-10 w-full bg-[#5D001E] text-white py-4 rounded-lg hover:bg-[#7a0a2e] text-lg font-semibold"
          >
            🛒 Add To Cart
          </button>

          {/* WhatsApp */}

          <button
            onClick={handleWhatsApp}
            className="mt-4 w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 text-lg font-semibold"
          >
            💬 Chat on WhatsApp
          </button>

        </div>

      </div>
    </div>
  );
}

export default ProductDetails;