import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-20">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-10 space-y-10 border border-gray-200">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-gray-800">
          About <span className="text-[#F85606]">Lashang Fashion</span>
        </h1>

        {/* Intro */}
        <p className="text-gray-700 text-lg leading-relaxed text-center">
          Welcome to <span className="font-semibold text-[#F85606]">Lashang Fashion</span>, your trusted online destination for the latest and most innovative electronics. From cutting-edge gadgets to must-have accessories, we’re here to power your digital lifestyle with premium products and exceptional service.
        </p>

        {/* Mission */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#F85606]">Our Mission</h2>
          <p className="text-gray-700 text-base">
            Our mission is simple — to make innovative technology accessible to everyone. We are passionate about connecting people with high-quality tech at the best prices, delivered safely and efficiently.
          </p>
        </section>

        {/* Why Choose Us */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#F85606]">Why Choose Lashang Fashion?</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Top-quality products from trusted brands</li>
            <li>Lightning-fast & secure delivery</li>
            <li>Dedicated customer support</li>
            <li>Easy returns & hassle-free shopping</li>
            <li>Best prices guaranteed</li>
            <li>Safe and secure payments</li>
          </ul>
        </section>

        {/* Vision */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#F85606]">Our Vision</h2>
          <p className="text-gray-700 text-base">
            We envision a future where technology enhances everyday life. At Lashang Fashion, we stay ahead of trends, offering innovative, practical, and affordable solutions that empower individuals and businesses.
          </p>
        </section>

        {/* Policies */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#F85606]">Terms & Policies</h2>
          <div className="space-y-4 text-gray-700 text-base">
            <div>
              <h3 className="font-semibold text-lg text-[#F85606]">Return & Replacement Policy</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Products can be returned or replaced within <strong>7 days</strong> of delivery.</li>
                <li>Items must be unused, untampered, and in original packaging.</li>
                <li>Refunds are processed within <strong>5–10 business days</strong> after inspection.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-[#F85606]">Warranty Policy</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Most electronics include a manufacturer's warranty.</li>
                <li>Damage caused by misuse or water is not covered.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-[#F85606]">Shipping Policy</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Nationwide secure delivery.</li>
                <li>Orders processed within <strong>1–2 business days</strong>.</li>
                <li>Delivery time: typically <strong>2–7 days</strong> depending on location.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-[#F85606]">Cancellation Policy</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Orders can be cancelled before shipment.</li>
                <li>Once shipped, cancellation is unavailable — return may be requested.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-[#F85606]">Privacy Policy</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Your personal information is secure with us.</li>
                <li>Data used only for order processing & service improvement.</li>
                <li>No sharing of data with unauthorized parties.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center pt-4">
          <h3 className="text-xl font-semibold text-[#F85606] mb-3">
            Join the Lashang Fashion Family
          </h3>
          <p className="text-gray-700 max-w-2xl mx-auto mb-6">
            Whether you’re a tech enthusiast, a professional, or just searching for something cool & useful — Lashang Fashion has the perfect solution for you.
          </p>

          <Link to="/products">
            <button className="bg-[#F85606] hover:bg-[#d94d05] text-white font-semibold px-7 py-3 rounded-xl shadow-md transition-all duration-300">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;