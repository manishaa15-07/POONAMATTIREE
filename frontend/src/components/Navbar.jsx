import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCartIcon, UserCircleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { getCartCount } = useCart();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const profileRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Explore", path: "/products" },
    ];

    return (
        <nav className="bg-white shadow-md sticky top-0 z-40">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-20">

                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img src="/POONAM.png" alt="Poonam Ladies Wear" className="h-20 w-[150px]" />
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-10">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `relative font-medium text-sm tracking-wide transition-all duration-200 
                                     ${isActive ? 'text-primary' : 'text-gray-700 hover:text-primary'} 
                                     after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center space-x-5">

                        {/* Cart */}
                        <Link to="/cart" className="relative group">
                            <ShoppingCartIcon className="h-6 w-6 text-gray-600 group-hover:text-primary transition-transform duration-200 group-hover:scale-110" />
                            {getCartCount() > 0 && (
                                <span className="absolute -top-1.5 -right-2 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                    {getCartCount()}
                                </span>
                            )}
                        </Link>

                        {/* Profile / Login */}
                        {user ? (
                            <div className="relative" ref={profileRef}>
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center space-x-2 text-gray-600 hover:text-primary focus:outline-none transition"
                                >
                                    <UserCircleIcon className="h-7 w-7" />
                                    <span className="hidden md:inline font-medium">{user.firstName}</span>
                                </button>
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-fadeIn z-50">
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setIsProfileOpen(false)}>Profile</Link>
                                        <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setIsProfileOpen(false)}>My Orders</Link>
                                        <Link to="/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setIsProfileOpen(false)}>Wishlist</Link>
                                        <button
                                            onClick={() => { logout(); setIsProfileOpen(false); }}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="hidden md:flex items-center space-x-3">
                                <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-full hover:bg-gray-100 transition">Login</Link>
                                <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-full hover:bg-primary/90 transition">Sign Up</Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button className="md:hidden text-gray-700 hover:text-primary transition" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-2 space-y-2 pb-4 border-t animate-slideDown">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded"
                            >
                                {link.name}
                            </NavLink>
                        ))}
                        {!user && (
                            <div className="flex flex-col px-4 space-y-2">
                                <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-full text-center hover:bg-gray-100">Login</Link>
                                <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-full text-center hover:bg-primary/90">Sign Up</Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
