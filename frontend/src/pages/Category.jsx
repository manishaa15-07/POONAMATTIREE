import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productsAPI } from '../services/api';

const Category = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                setLoading(true);
                const response = await productsAPI.getByCategory(category, {
                    page: currentPage,
                    limit: 12,
                    sort: sortBy === 'price-asc' ? 'price-asc' :
                        sortBy === 'price-desc' ? 'price-desc' : 'newest'
                });

                setProducts(response.data.products || []);
                setTotalPages(response.data.pages || 1);
                setError(null);
            } catch (err) {
                console.error('Error fetching category products:', err);
                setError('Failed to load products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryProducts();
    }, [category, currentPage, sortBy]);

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
        setCurrentPage(1); // Reset to first page when sorting changes
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-lg text-gray-600">Loading {category} products...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 text-lg">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 capitalize">{category}</h1>
                            <p className="mt-2 text-gray-600">
                                Discover our amazing collection of {category.toLowerCase()}
                            </p>
                        </div>
                        <div className="mt-4 sm:mt-0">
                            <select
                                value={sortBy}
                                onChange={handleSortChange}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="newest">Newest First</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {products.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No products found in this category.</p>
                        <Link
                            to="/"
                            className="mt-4 inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/80"
                        >
                            Back to Home
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products.map(product => (
                                <div key={product._id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="h-74 w-full object-cover rounded-t-lg"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                                        <p className="text-primary font-bold text-lg mb-3">₹{product.price}</p>
                                        <Link
                                            to={`/product/${product._id}`}
                                            className="w-full inline-block text-center rounded-lg bg-primary px-4 py-2 text-sm text-white hover:bg-primary/80 transition"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-12 flex justify-center">
                                <nav className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-3 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                    >
                                        Previous
                                    </button>

                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`px-3 py-2 rounded-lg border ${currentPage === page
                                                ? 'bg-primary text-white border-primary'
                                                : 'border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                    >
                                        Next
                                    </button>
                                </nav>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Category;
