"use client"
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";

export default function LandingPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://imex-port.vercel.app/products?limit=6");
        const data = await res.json();
        setProducts(data.slice(0, 6)); // ensure only 6 products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  // const products = [
  //   {
  //     id: 1,
  //     name: "AeroBuds Pro Wireless Earbuds",
  //     price: "$129",
  //     img: "https://images.unsplash.com/photo-1590650046871-92c887180603?q=80",
  //     desc: "Active noise cancellation, 32-hour battery life, crystal clear audio.",
  //   },
  //   {
  //     id: 2,
  //     name: "NovaX Smartwatch Series 7",
  //     price: "$199",
  //     img: "https://images.unsplash.com/photo-1603791445824-0050bd436b47?q=80",
  //     desc: "Heart-rate AI, sleep monitor, GPS, 5-day battery for active lifestyles.",
  //   },
  //   {
  //     id: 3,
  //     name: "Lumeo RGB Mechanical Keyboard",
  //     price: "$89",
  //     img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80",
  //     desc: "Hot-swappable keys, silent red switches, fully customizable RGB.",
  //   },
  // ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Mitchell",
      text: "The earbuds are honestly better than my previous Apple AirPods! Amazing build quality.",
    },
    {
      id: 2,
      name: "Jordan Lee",
      text: "Loved the smartwatch. Battery lasts forever and the GPS accuracy is spot on.",
    },
    {
      id: 3,
      name: "Alex Carter",
      text: "Keyboard typing feels buttery smooth. RGB customization is insane!",
    },
  ];

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80')",
        }}
      >
        <div className="hero-overlay  bg-opacity-60"></div>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-xl">
            <h1 className="mb-5 text-7xl font-bold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
              Premium Tech Accessories
            </h1>

            <p className="mb-5 text-lg">
              Discover smart gadgets crafted for performance, comfort, and
              design.
            </p>
            <button className="btn btn-primary">Shop Now</button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-base-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Shop With Us?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow hover:shadow-xl transition">
              <div className="card-body">
                <h3 className="card-title">Fast Worldwide Shipping</h3>
                <p>
                  Get your product delivered to your door in 3–7 business days.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow hover:shadow-xl transition">
              <div className="card-body">
                <h3 className="card-title">1-Year Warranty</h3>
                <p>
                  All products include premium warranty & trusted customer
                  support.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow hover:shadow-xl transition">
              <div className="card-body">
                <h3 className="card-title">Quality You Can Trust</h3>
                <p>
                  Our products go through a 32-point quality assurance process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT SECTION */}
      <section className="py-20 bg-base-100">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12">
      Top Selling Products
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  </div>
</section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-base-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Loved by Thousands
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="card bg-white shadow hover:shadow-lg transition p-6 text-gray-700"
              >
                <p className="mb-4">“{t.text}”</p>
                <h4 className="font-semibold">{t.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="py-20 bg-primary text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Upgrade Your Everyday Tech</h2>
        <p className="text-lg mb-6">
          Get exclusive offers & latest gadget updates.
        </p>
        <button className="btn btn-neutral">Start Shopping</button>
      </section>
    </div>
  );
}
