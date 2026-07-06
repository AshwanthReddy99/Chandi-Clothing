import { useEffect, useState } from "react";
import api from "../services/api";

function Categories({ selectedCategory, setSelectedCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api
      .get("/products")
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
    <section className="py-10 sm:py-12 bg-white">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-[#5D001E] mb-8 sm:mb-10">
        Shop By Category
      </h2>

      <div className="flex flex-wrap justify-center gap-3 sm:gap-5 px-4">

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 sm:px-7 lg:px-8 py-2.5 sm:py-3 rounded-full border-2 font-semibold text-sm sm:text-base transition-all duration-300 ${
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