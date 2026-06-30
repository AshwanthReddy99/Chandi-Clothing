import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold text-[#5D001E] mb-10 text-center">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Add Product */}

        <Link
          to="/admin/add-product"
          className="bg-white shadow-lg rounded-xl p-8 hover:shadow-xl transition"
        >
          <div className="text-5xl mb-4">➕</div>

          <h2 className="text-2xl font-bold text-[#5D001E]">
            Add Product
          </h2>

          <p className="mt-3 text-gray-600">
            Add new sarees to your store.
          </p>
        </Link>

        {/* View Products */}

        <Link
          to="/admin/products"
          className="bg-white shadow-lg rounded-xl p-8 hover:shadow-xl transition"
        >
          <div className="text-5xl mb-4">🛍️</div>

          <h2 className="text-2xl font-bold text-[#5D001E]">
            View Products
          </h2>

          <p className="mt-3 text-gray-600">
            View, edit and delete products.
          </p>
        </Link>

        {/* View Orders */}

        <Link
          to="/admin/orders"
          className="bg-white shadow-lg rounded-xl p-8 hover:shadow-xl transition"
        >
          <div className="text-5xl mb-4">📦</div>

          <h2 className="text-2xl font-bold text-[#5D001E]">
            View Orders
          </h2>

          <p className="mt-3 text-gray-600">
            Check all customer orders.
          </p>
        </Link>

        {/* Future Feature */}

        <div className="bg-white shadow-lg rounded-xl p-8 opacity-60">
          <div className="text-5xl mb-4">📊</div>

          <h2 className="text-2xl font-bold text-[#5D001E]">
            Analytics
          </h2>

          <p className="mt-3 text-gray-600">
            Coming Soon...
          </p>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;