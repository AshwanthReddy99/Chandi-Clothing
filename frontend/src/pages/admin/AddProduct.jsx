import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function AddProduct() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // Upload Image to Cloudinary
  const uploadImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setLoading(true);

    const data = new FormData();

    data.append("file", file);
    data.append("upload_preset", "chandi_clothing");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dwzlurmtr/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();

      setProduct((prev) => ({
        ...prev,
        image: result.secure_url,
      }));

      alert("Image Uploaded Successfully");
    } catch (error) {
      console.log(error);
      alert("Image Upload Failed");
    }

    setLoading(false);
  };

  const addProduct = async () => {
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
      await api.post("/add-product", product);

      alert("Product Added Successfully");

      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white p-10 rounded-xl shadow-xl w-[500px]">

        <h1 className="text-4xl font-bold mb-8 text-center text-[#5D001E]">
          Add Product
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        />

        <input
          type="file"
          accept="image/*"
          className="w-full border p-3 rounded mb-4"
          onChange={uploadImage}
        />

        {loading && (
          <p className="text-blue-600 mb-4">
            Uploading Image...
          </p>
        )}

        {product.image && (
          <img
            src={product.image}
            alt="Preview"
            className="w-48 h-48 object-cover rounded-lg mb-4"
          />
        )}

        <textarea
          name="description"
          placeholder="Description"
          rows="4"
          className="w-full border p-3 rounded mb-6"
          onChange={handleChange}
        />

        <button
          onClick={addProduct}
          className="w-full bg-[#5D001E] text-white py-3 rounded-lg hover:bg-[#7a0a2e]"
        >
          Add Product
        </button>

      </div>

    </div>
  );
}

export default AddProduct;