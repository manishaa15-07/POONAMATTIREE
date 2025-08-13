import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle sign up logic here
    };

    const InputField = ({ id, name, type, value, onChange, label, icon: Icon }) => (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    id={id}
                    name={name}
                    type={type}
                    required
                    value={value}
                    onChange={onChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                />
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <img src="/LogoPoonam.png" alt="Logo" className="mx-auto h-14" />
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                    Create your account
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Join us to explore the best collection!
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-6 shadow-xl rounded-2xl sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <InputField
                            id="name"
                            name="name"
                            type="text"
                            label="Full Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            icon={UserIcon}
                        />

                        <InputField
                            id="email"
                            name="email"
                            type="email"
                            label="Email address"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            icon={EnvelopeIcon}
                        />

                        <InputField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            icon={LockClosedIcon}
                        />

                        <InputField
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            icon={LockClosedIcon}
                        />

                        <div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 rounded-lg text-white font-semibold
                                           bg-gradient-to-r from-pink-500 to-red-500 
                                           hover:from-pink-600 hover:to-red-600 
                                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <span className="text-sm text-gray-500">
                            Already have an account?{' '}
                            <Link
                                to="/signin"
                                className="font-medium text-pink-500 hover:text-pink-600"
                            >
                                Sign in
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
