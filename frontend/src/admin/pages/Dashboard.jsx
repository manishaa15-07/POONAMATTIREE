import React, { useState, useEffect } from 'react';
import { adminDashboardAPI } from '../services/adminApi';
import { useAdminAuth } from '../context/AdminAuthContext';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { admin } = useAdminAuth();

    useEffect(() => {
        if (admin) {
            fetchDashboardData();
        } else {
            console.log('⚠️ Admin not logged in, skipping dashboard data fetch');
        }
    }, [admin]);

    const fetchDashboardData = async () => {
        try {


            // Check if admin token exists
            const adminToken = localStorage.getItem('adminToken');
            if (!adminToken) {
                console.error('❌ No admin token found in localStorage');
                return;
            }

            setLoading(true);
            const response = await adminDashboardAPI.getStats();


            const { stats: dashboardStats, recentOrders: orders, topProducts: products } = response.data;


            setStats(dashboardStats);
            setRecentOrders(orders || []);
            setTopProducts(products || []);
        } catch (error) {
            console.error('❌ Error fetching dashboard data:', error);
            console.error('❌ Error response:', error.response);
            console.error('❌ Error message:', error.message);

            // If we get a 401, it might mean the token is invalid
            if (error.response?.status === 401) {
                console.error('🔐 401 Unauthorized - Admin token might be invalid');
                console.error('🔑 Current admin token:', localStorage.getItem('adminToken'));
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Error Notification */}


            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Welcome to your admin dashboard</p>

                {/* Debug Section */}
                {/* <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h3 className="text-sm font-medium text-yellow-800 mb-2">Debug Info:</h3>
                    <div className="text-xs text-yellow-700 space-y-1">
                        <p>Admin logged in: {admin ? 'YES' : 'NO'}</p>
                        <p>Admin token exists: {localStorage.getItem('adminToken') ? 'YES' : 'NO'}</p>
                        <p>User token exists: {localStorage.getItem('token') ? 'YES' : 'NO'}</p>
                        <button
                            onClick={() => {
                                console.log('🔍 Manual debug check:');
                                console.log('Admin:', admin);
                                console.log('Admin token:', localStorage.getItem('adminToken'));
                                console.log('User token:', localStorage.getItem('token'));
                            }}
                            className="text-xs bg-yellow-200 px-2 py-1 rounded hover:bg-yellow-300"
                        >
                            Check Console
                        </button>
                    </div>
                </div> */}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Orders</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.totalOrders}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                            <p className="text-2xl font-semibold text-gray-900">₹{stats.totalRevenue?.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Products</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.totalProducts}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Users</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Orders and Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
                    </div>
                    <div className="p-6">
                        {recentOrders.length > 0 ? (
                            <div className="space-y-4">
                                {recentOrders.slice(0, 5).map((order) => (
                                    <div key={order._id} className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                #{order.orderNumber || order._id.slice(-6)}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {order.user?.firstName} {order.user?.lastName}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-gray-900">₹{order.total}</p>
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${(order.orderStatus || order.status) === 'delivered' ? 'bg-green-100 text-green-800' :
                                                (order.orderStatus || order.status) === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    (order.orderStatus || order.status) === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                        'bg-gray-100 text-gray-800'
                                                }`}>
                                                {(order.orderStatus || order.status || 'pending').toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-4">No recent orders</p>
                        )}
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">Top Products</h3>
                    </div>
                    <div className="p-6">
                        {topProducts.length > 0 ? (
                            <div className="space-y-4">
                                {topProducts.slice(0, 5).map((product) => (
                                    <div key={product._id} className="flex items-center">
                                        <img
                                            src={product.images?.[0] || '/placeholder-image.jpg'}
                                            alt={product.name}
                                            className="w-10 h-10 rounded object-cover"
                                            onError={(e) => {
                                                e.target.src = '/placeholder-image.jpg';
                                            }}
                                        />
                                        <div className="ml-3 flex-1">
                                            <p className="text-sm font-medium text-gray-900">{product.name}</p>
                                            <p className="text-sm text-gray-600">₹{product.price}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-gray-900">
                                                {product.category || 'No category'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-4">No products data</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 