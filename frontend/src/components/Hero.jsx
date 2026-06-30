function Hero() {
  return (
    <section className="bg-gradient-to-r from-[#5D001E] to-[#800020] text-white">
      <div className="max-w-7xl mx-auto px-8 py-24 flex flex-col md:flex-row items-center justify-between">
        
        <div className="md:w-1/2">
          <h1 className="text-6xl font-bold leading-tight">
            Elegance in Every Drape
          </h1>

          <p className="mt-6 text-xl">
            Discover premium silk, cotton, bridal and designer sarees
            crafted for every occasion.
          </p>

          <button className="mt-8 bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400">
            Shop Now
          </button>
        </div>

        <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
          <img
            src="https://i.pinimg.com/1200x/17/0e/a9/170ea91bd51de02d29a0fde94eb59049.jpg"
            alt="Saree Collection"
            className="rounded-2xl shadow-2xl w-[450px] h-[550px] object-cover"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;