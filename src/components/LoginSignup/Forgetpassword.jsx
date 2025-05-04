import React, { useEffect, useState } from 'react';
// import NavBar from '../../Components/User/Navbar';
// import Resources from '../../Components/User/Resources';
// import Footer from '../../Components/User/Footer';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../Cart/Cart';

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            return setError('Email is required');
        }
        try {
            setLoading(true);
            const response = await fetch(`${baseURL}/api/forgot/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(data.message || 'Email sent successfully, please check your inbox.');
            } else {
                setError(data.message || 'Something went wrong');
            }
        } catch (error) {
            console.log('Error in forgot-password:', error);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (error || success) {
            setTimeout(() => {
                setError('');
                setSuccess('');
            }, 4000);
        }
    }, [error, success]);

    return (
        <>
            {/* <NavBar /> */}
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                    <h1 className="text-2xl font-semibold text-center text-gray-800">Forgot Password</h1>
                    <p className="mt-2 text-center text-sm text-gray-500">
                        Enter your email address and we'll send you an OTP to reset your password.
                    </p>

                    {error && (
                        <p className="mt-4 text-sm text-red-600 bg-red-50 p-4 rounded-md">{error}</p>
                    )}

                    {success && (
                        <p className="mt-4 text-sm text-green-600 bg-green-50 p-4 rounded-md">{success}</p>
                    )}

                    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                        >
                            {loading ? (
                                <span>Verifying...</span>
                            ) : (
                                <span>Verify Email</span>
                            )}
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <a
                            href="/login"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Back to Login
                        </a>
                    </div>
                </div>
            </div>

            {/* <Resources />
            <Footer /> */}
        </>
    );
};
