import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-5xl">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">
          Get in Touch with <span className="text-[#F85606]">Lashang Fashion</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Info Section */}
          <div className="text-gray-700 space-y-6">
            <div>
              <h3 className="text-2xl font-semibold">Contact Info</h3>
              <p className="mt-2 text-gray-600">
                Have a question or need support? We're here to help you with your electronics journey.
              </p>
            </div>
            <div className="space-y-2">
              <p><strong>📍 Address:</strong> Imadol, Lalitpur, Nepal</p>
              <p><strong>📧 Email:</strong> lashangfashion@gmail.com</p>
              <p><strong>📞 Phone:</strong> +977 9860998818</p>
            </div>
          </div>

          {/* Form Section */}
          <form className="space-y-5">
            <div>
              <label className="block text-gray-800 mb-1 font-medium">Your Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-800 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F85606]"
              />
            </div>
            <div>
              <label className="block text-gray-800 mb-1 font-medium">Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-800 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F85606]"
              />
            </div>
            <div>
              <label className="block text-gray-800 mb-1 font-medium">Your Message</label>
              <textarea
                rows="5"
                placeholder="Type your message..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-800 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F85606]"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#F85606] hover:bg-[#d94d05] text-white font-semibold py-3 rounded-lg transition-all duration-300"
            >
              Send Message 🚀
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Contact;
