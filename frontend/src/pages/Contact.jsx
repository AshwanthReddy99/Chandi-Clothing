import {
  FaEnvelope,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

function Contact() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl sm:text-5xl font-bold text-center text-[#5D001E]">
          Contact Chandi Clothing
        </h1>

        <p className="text-center text-gray-600 mt-4 text-lg">
          We'd love to hear from you. Reach out anytime!
        </p>

        <div className="grid lg:grid-cols-2 gap-10 mt-12">

          {/* Contact Information */}

          <div className="bg-white rounded-2xl shadow-xl p-8">

            <h2 className="text-3xl font-bold text-[#5D001E] mb-8">
              Contact Information
            </h2>

            <div className="space-y-6">

              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-[#5D001E] text-2xl" />
                <span className="text-lg font-medium">
                  +91 9398383655
                </span>
              </div>

              <div className="flex items-center gap-4">
                <FaEnvelope className="text-[#5D001E] text-2xl" />
                <span className="text-lg font-medium">
                  ashwanthsura@gmail.com
                </span>
              </div>

              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-[#5D001E] text-2xl" />
                <span className="text-lg font-medium">
                  Hyderabad, Telangana, India
                </span>
              </div>

            </div>

            <div className="mt-10">

              <h3 className="text-2xl font-bold text-[#5D001E] mb-5">
                Follow Us
              </h3>

              <div className="flex gap-6">

                <a
                  href="https://wa.me/919398383655"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-green-500 text-white p-4 rounded-full hover:bg-green-600 transition"
                >
                  <FaWhatsapp size={24} />
                </a>

                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-pink-500 text-white p-4 rounded-full hover:bg-pink-600 transition"
                >
                  <FaInstagram size={24} />
                </a>

              </div>

            </div>

          </div>

          {/* Contact Form */}

          <div className="bg-white rounded-2xl shadow-xl p-8">

            <h2 className="text-3xl font-bold text-[#5D001E] mb-8">
              Send a Message
            </h2>

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#5D001E]"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#5D001E]"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#5D001E]"
              />

              <textarea
                rows="6"
                placeholder="Write your message..."
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#5D001E]"
              ></textarea>

              <button
                type="button"
                className="w-full bg-[#5D001E] hover:bg-[#7a0a2e] text-white py-4 rounded-xl text-lg font-semibold transition"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Contact;