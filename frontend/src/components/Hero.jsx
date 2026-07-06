import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-[#5D001E] to-[#800020] text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16 lg:py-24 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">

        {/* Left Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Elegance in Every Drape
          </h1>

          <p className="mt-5 text-base sm:text-lg lg:text-xl text-gray-100">
            Discover premium silk, cotton, bridal and designer sarees crafted
            for every occasion.
          </p>

          <Link to="/sarees">
            <button className="mt-8 bg-yellow-500 text-black px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition duration-300">
              Shop Now
            </button>
          </Link>

        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2 flex justify-center">

          <img
            src="https://i.pinimg.com/1200x/17/0e/a9/170ea91bd51de02d29a0fde94eb59049.jpg"
            alt="Saree Collection"
            className="rounded-2xl shadow-2xl object-cover
              w-72
              h-96
              sm:w-80
              sm:h-[450px]
              md:w-[420px]
              md:h-[520px]
              lg:w-[450px]
              lg:h-[550px]"
          />

        </div>

      </div>
    </section>
  );
}

export default Hero;