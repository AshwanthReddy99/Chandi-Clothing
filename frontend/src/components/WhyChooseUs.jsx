function WhyChooseUs() {
  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-10 text-[#5D001E]">
        Why Choose Chandi Clothing?
      </h2>

      <div className="grid md:grid-cols-3 gap-8 px-10">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-2xl font-semibold mb-3">
            Premium Quality
          </h3>

          <p>
            Handpicked sarees made from high-quality fabrics.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-2xl font-semibold mb-3">
            Fast Delivery
          </h3>

          <p>
            Quick and secure delivery across India.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-2xl font-semibold mb-3">
            Trusted Service
          </h3>

          <p>
            Thousands of happy customers trust our collections.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;