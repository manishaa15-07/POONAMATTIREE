import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

// Sample product data (replace with API data later)
const products = [
    {
        id: 1,
        name: "Floral Summer Dress",
        price: 1299,
        image: "https://via.placeholder.com/300x400.png?text=Dress+1",
    },
    {
        id: 2,
        name: "Elegant Kurti Set",
        price: 1599,
        image: "https://via.placeholder.com/300x400.png?text=Kurti+2",
    },
    {
        id: 3,
        name: "Casual Denim Jacket",
        price: 1899,
        image: "https://via.placeholder.com/300x400.png?text=Jacket+3",
    },
    {
        id: 4,
        name: "Printed Saree",
        price: 2499,
        image: "https://via.placeholder.com/300x400.png?text=Saree+4",
    },
];

export default function NewArrivals() {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-pink-500 to-orange-400 text-white py-16 text-center">
                <h1 className="text-4xl font-bold">✨ New Arrivals ✨</h1>
                <p className="mt-2 text-lg opacity-90">
                    Fresh styles just in! Be the first to grab them.
                </p>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 group"
                        >
                            {/* Image */}
                            <div className="relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-72 object-cover transform group-hover:scale-105 transition duration-300"
                                />
                                <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-pink-100">
                                    <FaRegHeart className="text-pink-500 text-lg" />
                                </button>
                            </div>

                            {/* Details */}
                            <div className="p-5 text-center">
                                <h3 className="text-lg font-semibold">{product.name}</h3>
                                <p className="mt-1 text-pink-600 font-bold">₹{product.price}</p>

                                <Link
                                    to={`/product/${product.id}`}
                                    className="mt-4 inline-block bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-full transition duration-300"
                                >
                                    Add to Cart
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
