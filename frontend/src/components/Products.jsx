import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "./ProductCard";

function Products({ search, selectedCategory }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/products");

      setProducts(response.data);
    } catch (error) {
      console.log("Products API Error:", error);

      setError(
        "Unable to load products. The server may be starting. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section
      id="products"
      className="px-6 md:px-10 py-16 bg-white"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#5D001E] mb-10">
        Featured Sarees
      </h2>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-[#5D001E] rounded-full animate-spin"></div>

          <p className="mt-5 text-lg text-gray-600">
            Loading sarees...
          </p>

          <p className="mt-2 text-sm text-gray-400 text-center">
            The server may take a few seconds to start.
          </p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-xl md:text-2xl font-semibold text-red-600 text-center">
            {error}
          </p>

          <button
            onClick={fetchProducts}
            className="mt-6 bg-[#5D001E] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#7a0a2e] transition"
          >
            Try Again
          </button>
        </div>
      )}

      {/* No Products */}
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl md:text-2xl font-semibold text-gray-500">
            No products found.
          </p>
        </div>
      )}

      {/* Products */}
      {!loading && !error && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Products;