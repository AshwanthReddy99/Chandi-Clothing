import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

function Hero() {
  const slides = [
    {
      title: "Elegance in Every Drape",
      subtitle: "Premium Silk Sarees Collection",
      image:
        "https://i.pinimg.com/1200x/17/0e/a9/170ea91bd51de02d29a0fde94eb59049.jpg",
    },
    {
      title: "Bridal Collection",
      subtitle: "Wedding Sarees For Special Moments",
      image:
        "https://i.pinimg.com/1200x/8a/5a/49/8a5a495b588f2ededc8f5a1bdb4bac43.jpg",
    },
    {
      title: "Designer Sarees",
      subtitle: "Latest Fashion Trends",
      image:
        "https://i.pinimg.com/736x/e4/91/25/e49125fdc344421a3529bff49f8cd170.jpg",
    },
  ];

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 3000 }}
      pagination={{ clickable: true }}
      loop={true}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <section className="bg-gradient-to-r from-[#5D001E] to-[#800020] text-white">
            <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between">

              <div className="md:w-1/2 text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  {slide.title}
                </h1>

                <p className="mt-6 text-lg md:text-xl">
                  {slide.subtitle}
                </p>

                <button className="mt-8 bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400">
                  Shop Now
                </button>
              </div>

              <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
                <img
                  src={slide.image}
                  alt=""
                  className="rounded-2xl shadow-2xl w-full max-w-md h-[500px] object-cover"
                />
              </div>

            </div>
          </section>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Hero;