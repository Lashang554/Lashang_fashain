import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-theme py-12 px-4 sm:px-6 lg:px-20">
      <div className="card-theme max-w-5xl mx-auto rounded-2xl shadow-xl p-10 space-y-10">
        <h2 className="text-4xl font-bold text-center text-theme-primary">
          Get in Touch with <span className="text-[#F85606]">Lashang Fashion</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Info Section */}
          <div className="text-theme-secondary space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-[#F85606]">Contact Info</h3>
              <p className="mt-2 text-theme-tertiary">
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
              <label className="block text-theme-primary mb-1 font-medium">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input-theme w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F85606]"
              />
            </div>
            <div>
              <label className="block text-theme-primary mb-1 font-medium">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input-theme w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F85606]"
              />
            </div>
            <div>
              <label className="block text-theme-primary mb-1 font-medium">Your Message</label>
              <textarea
                rows="5"
                placeholder="Type your message..."
                className="input-theme w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F85606]"
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn-primary w-full font-semibold py-3 rounded-lg transition-all duration-300"
            >
              Send Message
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Contact;
