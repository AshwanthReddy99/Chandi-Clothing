import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "./ProductCard";

function Products({ search, selectedCategory }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get("/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase());

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-xl md:text-2xl font-semibold text-gray-500">
            No products found.
          </div>
        )}
      </div>
    </section>
  );
}

export default Products;