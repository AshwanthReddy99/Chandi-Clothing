import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const handleWhatsAppOrder = () => {
    const phoneNumber = "919398383655"; // Replace with your WhatsApp number

    let message = `🛍️ *New Order - Chandi Clothing*%0A%0A`;

    cart.forEach((item, index) => {
      message += `*${index + 1}. ${item.name}*%0A`;
      message += `💰 Price: ₹${item.price}%0A`;
      message += `📦 Quantity: ${item.quantity}%0A`;
      message += `🧾 Subtotal: ₹${
        Number(item.price) * item.quantity
      }%0A%0A`;
    });

    message += `━━━━━━━━━━━━━━%0A`;
    message += `💵 *Grand Total : ₹${total}*%0A%0A`;
    message += `Please confirm my order. 😊`;

    window.open(
      `https://wa.me/${phoneNumber}?text=${message}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold text-[#5D001E] mb-10">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-10 text-center">
            <h2 className="text-2xl font-semibold">
              Your cart is empty.
            </h2>
          </div>
        ) : (
          <>
            <div className="space-y-6">

              {cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-lg p-6 flex justify-between items-center"
                >
                  <div className="flex gap-6">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-lg"
                    />

                    <div>
                      <h2 className="text-2xl font-bold text-[#5D001E]">
                        {item.name}
                      </h2>

                      <p className="text-xl font-semibold mt-2">
                        ₹{item.price}
                      </p>

                      <div className="flex items-center gap-4 mt-5">

                        <button
                          onClick={() =>
                            decreaseQuantity(item._id)
                          }
                          className="bg-gray-300 px-4 py-2 rounded-lg text-xl"
                        >
                          −
                        </button>

                        <span className="text-xl font-bold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(item._id)
                          }
                          className="bg-gray-300 px-4 py-2 rounded-lg text-xl"
                        >
                          +
                        </button>

                      </div>

                      <p className="mt-5 font-bold text-pink-600 text-lg">
                        Subtotal : ₹
                        {Number(item.price) * item.quantity}
                      </p>

                    </div>

                  </div>

                  <button
                    onClick={() =>
                      removeFromCart(item._id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg"
                  >
                    Remove
                  </button>

                </div>
              ))}

            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mt-10">

              <h2 className="text-3xl font-bold text-[#5D001E]">
                Order Summary
              </h2>

              <p className="mt-5 text-xl">
                Total Products : {cart.length}
              </p>

              <h3 className="mt-4 text-3xl font-bold text-pink-600">
                Total : ₹{total}
              </h3>

              <Link to="/checkout">
                <button className="w-full mt-8 bg-[#5D001E] hover:bg-[#7a0a2e] text-white py-4 rounded-lg text-lg">
                  Proceed To Checkout
                </button>
              </Link>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg text-lg"
              >
                💬 Order via WhatsApp
              </button>

            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default Cart;