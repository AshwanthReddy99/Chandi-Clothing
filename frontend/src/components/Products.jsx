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
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16">

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-[#5D001E] mb-10">
        Featured Sarees
      </h2>

      {filteredProducts.length > 0 ? (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}

        </div>

      ) : (

        <div className="text-center text-xl sm:text-2xl font-semibold text-gray-500">
          No products found.
        </div>

      )}
    </section>
  );
}

export default Products;