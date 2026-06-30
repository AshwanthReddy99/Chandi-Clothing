import { useEffect, useState } from "react";
import api from "../../services/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/admin/orders");
      setOrders(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch orders.");
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const response = await api.put(
        `/admin/update-order-status/${orderId}`,
        {
          status,
        }
      );

      alert(response.data.message);

      fetchOrders();
    } catch (error) {
      console.error(error);
      alert("Failed to update order status.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-5xl font-bold text-[#5D001E] mb-10">
        All Orders
      </h1>

      {orders.length === 0 ? (
        <h2 className="text-2xl">No Orders Found</h2>
      ) : (
        orders.map((order, index) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold mb-5">
              Order #{index + 1}
            </h2>

            <p><strong>Name:</strong> {order.customer.name}</p>
            <p><strong>Email:</strong> {order.customer.email}</p>
            <p><strong>Mobile:</strong> {order.customer.mobile}</p>
            <p><strong>Address:</strong> {order.customer.address}</p>
            <p><strong>City:</strong> {order.customer.city}</p>
            <p><strong>State:</strong> {order.customer.state}</p>
            <p><strong>Pincode:</strong> {order.customer.pincode}</p>

            <p className="mt-3">
              <strong>Order Date:</strong> {order.created_at}
            </p>

            <hr className="my-5" />

            <h3 className="text-xl font-bold mb-4">
              Products
            </h3>

            {order.products.map((product, i) => (
              <div
                key={i}
                className="flex justify-between border-b py-2"
              >
                <span>{product.name}</span>
                <span>₹{product.price}</span>
              </div>
            ))}

            <h2 className="text-2xl font-bold text-[#5D001E] mt-5">
              Total : ₹{order.total}
            </h2>

            <div className="mt-6">
              <label className="font-bold mr-3">
                Order Status:
              </label>

              <select
                value={order.status}
                onChange={(e) =>
                  updateStatus(order._id, e.target.value)
                }
                className="border rounded-lg p-2"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminOrders;