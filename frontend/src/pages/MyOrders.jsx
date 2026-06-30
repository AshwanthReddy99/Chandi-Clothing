import { useEffect, useState } from "react";
import api from "../services/api";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      const response = await api.get(`/my-orders/${user.email}`);

      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";

      case "Processing":
        return "bg-blue-100 text-blue-800";

      case "Shipped":
        return "bg-purple-100 text-purple-800";

      case "Delivered":
        return "bg-green-100 text-green-800";

      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-5xl font-bold text-[#5D001E] mb-10">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <h2 className="text-2xl">
          You haven't placed any orders yet.
        </h2>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-8 mb-8"
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold">
                Order #{index + 1}
              </h2>

              <span
                className={`px-4 py-2 rounded-full font-semibold ${getStatusStyle(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            <p>
              <strong>Date:</strong> {order.created_at}
            </p>

            <p>
              <strong>Name:</strong> {order.customer.name}
            </p>

            <p>
              <strong>Email:</strong> {order.customer.email}
            </p>

            <hr className="my-5" />

            <h3 className="text-xl font-bold mb-4">
              Products
            </h3>

            {order.products.map((item, i) => (
              <div
                key={i}
                className="flex justify-between border-b py-2"
              >
                <span>{item.name}</span>

                <span>₹{item.price}</span>
              </div>
            ))}

            <h2 className="text-2xl font-bold mt-6 text-[#5D001E]">
              Total : ₹{order.total}
            </h2>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;