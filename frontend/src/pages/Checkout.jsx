import axios from "axios";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

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

      // Save order in MongoDB
      await axios.post(
        "http://127.0.0.1:8000/place-order",
        order
      );

      // ---------- WhatsApp Message ----------
      const phoneNumber = "919398383655"; // Replace with your WhatsApp number

      let message = `🛍️ *New Order - Chandi Clothing*

👤 *Customer Details*

Name : ${customer.name}
Phone : ${customer.mobile}
Email : ${customer.email}

📍 Address :
${customer.address}
${customer.city}
${customer.state}
${customer.pincode}

━━━━━━━━━━━━━━

🛒 *Products Ordered*

`;

      cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name}

Price : ₹${item.price}

Quantity : ${item.quantity}

Subtotal : ₹${Number(item.price) * item.quantity}

`;
      });

      message += `━━━━━━━━━━━━━━

💰 *Grand Total : ₹${total}*

Thank you ❤️`;

      clearCart();

      window.open(
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
          message
        )}`,
        "_blank"
      );

      alert("Order placed successfully!");

    } catch (error) {
      console.log(error);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* Customer Details */}

        <div className="bg-white rounded-xl shadow-lg p-8">

          <h1 className="text-4xl font-bold text-[#5D001E] mb-6">
            Checkout
          </h1>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            onChange={handleChange}
            className="w-full border p-3 rounded mb-6"
          />

          <button
            onClick={placeOrder}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg text-lg font-semibold"
          >
            💬 Place Order on WhatsApp
          </button>

        </div>

        {/* Order Summary */}

        <div className="bg-white rounded-xl shadow-lg p-8">

          <h2 className="text-3xl font-bold text-[#5D001E] mb-6">
            Order Summary
          </h2>

          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between border-b pb-4 mb-4"
            >
              <div>
                <h3 className="font-semibold text-lg">
                  {item.name}
                </h3>

                <p>
                  ₹{item.price} × {item.quantity}
                </p>
              </div>

              <h3 className="font-bold text-[#5D001E]">
                ₹{Number(item.price) * item.quantity}
              </h3>
            </div>
          ))}

          <hr className="my-4" />

          <h2 className="text-3xl font-bold text-pink-600">
            Total : ₹{total}
          </h2>

        </div>

      </div>

    </div>
  );
}

export default Checkout;