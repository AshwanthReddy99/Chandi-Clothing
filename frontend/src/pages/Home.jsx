import { useState } from "react";
import Categories from "../components/Categories";
import Hero from "../components/Hero";
import Products from "../components/Products";
import SearchBar from "../components/SearchBar";
import WhyChooseUs from "../components/WhyChooseUs";

function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <>
      <Hero />

      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <Products
        search={search}
        selectedCategory={selectedCategory}
      />

      <WhyChooseUs />
    </>
  );
}

export default Home;