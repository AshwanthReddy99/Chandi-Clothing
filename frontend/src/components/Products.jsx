import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function Products({ search, selectedCategory }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/products")
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
    <section className="px-10 py-16">
      <h2 className="text-4xl font-bold text-center mb-10">
        Featured Sarees
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))
        ) : (
          <div className="col-span-3 text-center text-2xl font-semibold text-gray-500">
            No products found.
          </div>
        )}
      </div>
    </section>
  );
}

export default Products;