import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/product/${id}`);

      setProduct(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch product.");
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const updateProduct = async () => {
    if (
      !product.name ||
      !product.price ||
      !product.image ||
      !product.description
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const response = await api.put(
        `/update-product/${id}`,
        {
          name: product.name,
          price: Number(product.price),
          image: product.image,
          description: product.description,
        }
      );

      alert(response.data.message);

      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-xl p-8">

        <h1 className="text-4xl font-bold text-[#5D001E] mb-8">
          Edit Product
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="text"
          name="image"
          placeholder="Image Name"
          value={product.image}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <textarea
          name="description"
          rows="4"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-6"
        />

        <button
          onClick={updateProduct}
          className="w-full bg-[#5D001E] text-white py-3 rounded-lg hover:bg-[#7a0a2e]"
        >
          Update Product
        </button>

      </div>
    </div>
  );
}

export default EditProduct;