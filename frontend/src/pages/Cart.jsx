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
    const phoneNumber = "919398383655";

    let message = `🛍️ *New Order - Chandi Clothing*%0A%0A`;

    cart.forEach((item, index) => {
      message += `*${index + 1}. ${item.name}*%0A`;
      message += `💰 Price: ₹${item.price}%0A`;
      message += `📦 Quantity: ${item.quantity}%0A`;
      message += `🧾 Subtotal: ₹${Number(item.price) * item.quantity}%0A%0A`;
    });

    message += `━━━━━━━━━━━━━━%0A`;
    message += `💵 *Grand Total : ₹${total}*%0A%0A`;
    message += `Please confirm my order 😊`;

    window.open(
      `https://wa.me/${phoneNumber}?text=${message}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-10 py-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#5D001E] mb-8">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-xl sm:text-2xl font-semibold">
              Your cart is empty.
            </h2>
          </div>
        ) : (
          <>
            <div className="space-y-6">

              {cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-lg p-5 flex flex-col lg:flex-row justify-between gap-6"
                >

                  <div className="flex flex-col sm:flex-row gap-5">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full sm:w-40 h-60 sm:h-40 object-cover rounded-lg"
                    />

                    <div className="flex-1">

                      <h2 className="text-xl sm:text-2xl font-bold text-[#5D001E]">
                        {item.name}
                      </h2>

                      <p className="mt-2 text-lg font-semibold">
                        ₹{item.price}
                      </p>

                      <div className="flex items-center gap-4 mt-5">

                        <button
                          onClick={() => decreaseQuantity(item._id)}
                          className="w-10 h-10 bg-gray-300 rounded-lg hover:bg-gray-400 text-xl"
                        >
                          −
                        </button>

                        <span className="text-xl font-bold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increaseQuantity(item._id)}
                          className="w-10 h-10 bg-gray-300 rounded-lg hover:bg-gray-400 text-xl"
                        >
                          +
                        </button>

                      </div>

                      <p className="mt-5 text-lg font-bold text-pink-600">
                        Subtotal : ₹{Number(item.price) * item.quantity}
                      </p>

                    </div>

                  </div>

                  <div className="flex items-end lg:items-center">
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="w-full lg:w-auto bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg"
                    >
                      Remove
                    </button>
                  </div>

                </div>
              ))}

            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mt-10">

              <h2 className="text-2xl sm:text-3xl font-bold text-[#5D001E]">
                Order Summary
              </h2>

              <p className="mt-5 text-lg sm:text-xl">
                Total Products : {cart.length}
              </p>

              <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-pink-600">
                Total : ₹{total}
              </h3>

              <Link to="/checkout">
                <button className="w-full mt-8 bg-[#5D001E] hover:bg-[#7a0a2e] text-white py-4 rounded-lg text-lg font-semibold">
                  Proceed To Checkout
                </button>
              </Link>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg text-lg font-semibold"
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