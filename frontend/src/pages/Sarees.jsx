import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import api from "../services/api";

function Sarees() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const search = searchParams.get("search") || "";

    if (search === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );

      setFilteredProducts(filtered);
    }
  }, [products, searchParams]);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");

      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen px-10 py-10 bg-gray-50">

      <h1 className="text-5xl font-bold text-center text-[#5D001E] mb-10">
        Our Saree Collection
      </h1>

      {filteredProducts.length === 0 ? (
        <h2 className="text-center text-2xl font-semibold text-gray-500">
          No products found.
        </h2>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default Sarees;