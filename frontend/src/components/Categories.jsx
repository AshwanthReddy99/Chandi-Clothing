import axios from "axios";
import { useEffect, useState } from "react";

function Categories({ selectedCategory, setSelectedCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/products")
      .then((response) => {
        const uniqueCategories = [
          "All",
          ...new Set(response.data.map((item) => item.category)),
        ];

        setCategories(uniqueCategories);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className="py-12 bg-white">
      <h2 className="text-5xl font-bold text-center text-[#5D001E] mb-10">
        Shop By Category
      </h2>

      <div className="flex flex-wrap justify-center gap-5">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-8 py-3 rounded-full border-2 font-semibold transition-all duration-300 ${
              selectedCategory === category
                ? "bg-[#5D001E] text-white border-[#5D001E]"
                : "bg-white text-[#5D001E] border-[#5D001E] hover:bg-[#5D001E] hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}

export default Categories;