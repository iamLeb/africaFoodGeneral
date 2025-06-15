import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notify } from "../../utils/Notify.js";
import api from "../../services/api.js";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowBack, MdShoppingCart, MdLocationOn, MdEmail, MdPhone } from "react-icons/md";

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        address: "",
        phone: "",
    });
    const [userProfile, setUserProfile] = useState(null);
    const [errors, setErrors] = useState({});
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);

        const token = localStorage.getItem('token');
        if (token) {
            const fetchUserProfile = async () => {
                try {
                    const res = await api.get(`/user/profile`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setUserProfile(res.data);
                } catch (error) {
                    console.error("Error fetching user profile", error);
                }
            };
            fetchUserProfile();
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        let valid = true;
        let newErrors = {};

        if (formData.fullName.trim().length < 2) {
            newErrors.fullName = "Full Name must be at least 2 characters long.";
            valid = false;
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
            valid = false;
        }

        const phonePattern = /^[0-9]{10,15}$/;
        if (!phonePattern.test(formData.phone)) {
            newErrors.phone = "Please enter a valid phone number (10-15 digits).";
            valid = false;
        }

        if (formData.address.trim().length < 5) {
            newErrors.address = "Address must be at least 5 characters long.";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        if (cartItems.length === 0) {
            notify("Your cart is empty. Please add items to the cart before placing an order.", {type: "error" });
            return;
        }
    
        if (!validateForm()) {
            notify("Please correct the errors in the form", { type: "error" });
            return;
        }
    
        const orderDetails = {
            formData,
            cartItems
        };
    
        const res = await api.post('/order', orderDetails);
        localStorage.setItem('token', formData.email);
    
        setShowConfirmation(true);
        localStorage.removeItem("cart");
        setCartItems([]);
    };

    const closePopup = () => {
        setShowConfirmation(false);
        notify('Order created successfully', { type: "success" });
        navigate("/");
    };

    const handleRemoveItem = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    return (
        <section className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-6xl mx-auto"
                >
                    <div className="flex items-center mb-8">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center text-gray-600 hover:text-[#7cc24e] transition-colors duration-300"
                        >
                            <MdArrowBack className="mr-2" />
                            Back to Shopping
                        </button>
                    </div>

                    <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Checkout</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column - Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {userProfile ? (
                                <div className="bg-white rounded-xl shadow-lg p-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6">User Profile</h2>
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <MdEmail className="text-[#7cc24e] text-xl" />
                                            <p className="text-gray-600">{userProfile.email}</p>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <MdLocationOn className="text-[#7cc24e] text-xl" />
                                            <p className="text-gray-600">{userProfile.address}</p>
                                        </div>
                                    </div>
                                    <button
                                        className="w-full mt-6 bg-[#7cc24e] hover:bg-[#6baa42] text-white px-6 py-3 rounded-lg transition-colors duration-300"
                                        onClick={() => navigate('/order-summary')}
                                    >
                                        Proceed to Payment
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleFormSubmit} className="bg-white rounded-xl shadow-lg p-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Information</h2>
                                    
                                    <div className="space-y-6">
                                        <div>
                                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name
                                            </label>
                                            <input
                                                placeholder="Enter your full name"
                                                type="text"
                                                id="fullName"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 rounded-lg border ${
                                                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                                                } focus:ring-2 focus:ring-[#7cc24e] focus:border-transparent transition-colors duration-300`}
                                                required
                                            />
                                            {errors.fullName && (
                                                <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                placeholder="Enter your email address"
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 rounded-lg border ${
                                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                                } focus:ring-2 focus:ring-[#7cc24e] focus:border-transparent transition-colors duration-300`}
                                                required
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                placeholder="Enter your phone number"
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 rounded-lg border ${
                                                    errors.phone ? 'border-red-500' : 'border-gray-300'
                                                } focus:ring-2 focus:ring-[#7cc24e] focus:border-transparent transition-colors duration-300`}
                                                required
                                            />
                                            {errors.phone && (
                                                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                                Delivery Address
                                            </label>
                                            <input
                                                placeholder="Enter your delivery address"
                                                type="text"
                                                id="address"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 rounded-lg border ${
                                                    errors.address ? 'border-red-500' : 'border-gray-300'
                                                } focus:ring-2 focus:ring-[#7cc24e] focus:border-transparent transition-colors duration-300`}
                                                required
                                            />
                                            {errors.address && (
                                                <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full mt-8 bg-[#7cc24e] hover:bg-[#6baa42] text-white px-6 py-3 rounded-lg transition-colors duration-300"
                                    >
                                        Place Order
                                    </button>
                                </form>
                            )}
                        </motion.div>

                        {/* Right Column - Order Summary */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-6"
                        >
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
                                    <MdShoppingCart className="text-[#7cc24e] text-2xl" />
                                </div>

                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                                    <p className="text-yellow-800">
                                        <span className="font-semibold">Note:</span> Payment will be collected upon delivery
                                    </p>
                                </div>

                                {cartItems.length > 0 ? (
                                    <div className="space-y-4">
                                        {cartItems.map(item => (
                                            <div
                                                key={item.id}
                                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src={'https://arabicawhite.s3.amazonaws.com/afg/' + item.image[0]}
                                                        alt={item.title}
                                                        className="w-16 h-16 object-cover rounded-lg"
                                                    />
                                                    <div>
                                                        <h3 className="font-medium text-gray-800">{item.title}</h3>
                                                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    className="text-red-500 hover:text-red-600 transition-colors duration-300"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500">Your cart is empty</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Order Confirmation Modal */}
            <AnimatePresence>
                {showConfirmation && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full"
                        >
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h3>
                                <p className="text-gray-600 mb-6">
                                    Thank you for your order. We will contact you shortly with delivery details.
                                </p>
                                <button
                                    onClick={closePopup}
                                    className="w-full bg-[#7cc24e] hover:bg-[#6baa42] text-white px-6 py-3 rounded-lg transition-colors duration-300"
                                >
                                    Return to Home
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Checkout;
