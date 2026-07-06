import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import api from "../services/api";

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);

  const [customer, setCustomer] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (
      !customer.name ||
      !customer.mobile ||
      !customer.address ||
      !customer.city ||
      !customer.state ||
      !customer.pincode
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const order = {
        customer,
        products: cart,
        total,
      };

      await api.post("/place-order", order);

      const phoneNumber = "919398383655";

      let message = `🛍️ *New Order - Chandi Clothing*

👤 Customer Details

Name : ${customer.name}
Phone : ${customer.mobile}
Email : ${customer.email}

📍 Address
${customer.address}
${customer.city}
${customer.state}
${customer.pincode}

━━━━━━━━━━━━━━

🛒 Products Ordered

`;

      cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name}

Price : ₹${item.price}

Quantity : ${item.quantity}

Subtotal : ₹${Number(item.price) * item.quantity}

`;
      });

      message += `━━━━━━━━━━━━━━

💰 Grand Total : ₹${total}

Thank You ❤️`;

      clearCart();

      window.open(
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
        "_blank"
      );

      alert("Order Placed Successfully");

    } catch (error) {
      console.log(error);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-8 lg:px-10 py-10">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">

        {/* Customer Details */}

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">

          <h1 className="text-3xl sm:text-4xl font-bold text-[#5D001E] mb-8">
            Checkout
          </h1>

          <div className="space-y-4">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-[#5D001E] focus:outline-none"
            />

            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-[#5D001E] focus:outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-[#5D001E] focus:outline-none"
            />

            <textarea
              rows="3"
              name="address"
              placeholder="Address"
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-[#5D001E] focus:outline-none"
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-[#5D001E] focus:outline-none"
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-[#5D001E] focus:outline-none"
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-[#5D001E] focus:outline-none"
            />

            <button
              onClick={placeOrder}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-semibold transition"
            >
              💬 Place Order on WhatsApp
            </button>

          </div>

        </div>

        {/* Order Summary */}

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">

          <h2 className="text-3xl font-bold text-[#5D001E] mb-8">
            Order Summary
          </h2>

          {cart.length === 0 ? (
            <p className="text-center text-gray-500">
              No Products Added.
            </p>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center border-b py-4"
                >
                  <div>

                    <h3 className="font-bold text-lg">
                      {item.name}
                    </h3>

                    <p className="text-gray-600">
                      ₹{item.price} × {item.quantity}
                    </p>

                  </div>

                  <h3 className="font-bold text-[#5D001E]">
                    ₹{Number(item.price) * item.quantity}
                  </h3>

                </div>
              ))}

              <div className="mt-8 flex justify-between items-center">

                <h2 className="text-2xl font-bold">
                  Grand Total
                </h2>

                <h2 className="text-3xl font-bold text-pink-600">
                  ₹{total}
                </h2>

              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
}

export default Checkout;