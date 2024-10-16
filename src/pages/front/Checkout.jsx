import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notify } from "../../utils/Notify.js";
import api from "../../services/api.js";

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        address: "",
    });
    const [userProfile, setUserProfile] = useState(null); // State for storing user profile
    const [errors, setErrors] = useState({});
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isMaintenance, setIsMaintenance] = useState(false); // New state for maintenance
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);

        // Check if a token exists in localStorage
        const token = localStorage.getItem('token');
        if (token) {
            // Simulate fetching the user profile using the token
            const fetchUserProfile = async () => {
                try {
                    const res = await api.get(`/user/profile`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setUserProfile(res.data); // Set the user profile data
                } catch (error) {
                    console.error("Error fetching user profile", error);
                    // Handle any token expiration or fetching errors
                }
            };
            fetchUserProfile();
        }
    }, []);

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

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

        // Full Name validation
        if (formData.fullName.trim().length < 2) {
            newErrors.fullName = "Full Name must be at least 2 characters long.";
            valid = false;
        }

        // Email validation using regular expression
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
            valid = false;
        }

        // Address validation
        if (formData.address.trim().length < 5) {
            newErrors.address = "Address must be at least 5 characters long.";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        // Check if the cart is empty
        if (cartItems.length === 0) {
            notify("Your cart is empty. Please add items to the cart before placing an order.", {type: "error" });
            return;
        }
    
        // Disable form submission if under maintenance
        if (isMaintenance) {
            notify("Checkout is currently under maintenance", { type: "warning" });
            return;
        }
    
        // Perform validation
        if (!validateForm()) {
            notify("Please correct the errors in the form", { type: "error" });
            return;
        }
    
        const orderDetails = {
            formData,
            cartItems
        };
    
        // send order to api
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
        <section className="bg-gray-100 py-20">
            <div className="container mx-auto px-6">
                <h1 className="text-center text-3xl font-semibold mb-8 text-gray-800">Checkout</h1>

                <div className="mb-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-blue-500 hover:underline"
                    >
                        &larr; Back to Previous Page
                    </button>
                </div>

                {isMaintenance && (
                    <div className="mb-6 text-red-500 text-center font-semibold">
                        Checkout is currently under maintenance. Please try again later.
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        {userProfile ? (
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Profile</h2>
                                <p><strong>Full Name:</strong> {userProfile.fullName}</p>
                                <p><strong>Email:</strong> {userProfile.email}</p>
                                <p><strong>Address:</strong> {userProfile.address}</p>
                                <button
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition mt-4"
                                    onClick={() => navigate('/order-summary')}
                                >
                                    Proceed to Payment
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shipping Information</h2>
                                <div className="mb-4">
                                    <label htmlFor="fullName" className="block text-gray-700">Full Name</label>
                                    <input
                                        placeholder="Enter Full Name"
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className={`w-full border border-gray-300 rounded-lg p-2 ${errors.fullName ? 'border-red-500' : ''}`}
                                        required
                                        disabled={isMaintenance}
                                    />
                                    {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-gray-700">Email Address</label>
                                    <input
                                        placeholder="Enter Your Email Address"
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full border border-gray-300 rounded-lg p-2 ${errors.email ? 'border-red-500' : ''}`}
                                        required
                                        disabled={isMaintenance}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="address" className="block text-gray-700">Delivery Address</label>
                                    <input
                                        placeholder="Enter Delivery Address"
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className={`w-full border border-gray-300 rounded-lg p-2 ${errors.address ? 'border-red-500' : ''}`}
                                        required
                                        disabled={isMaintenance}
                                    />
                                    {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                                </div>
                                
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                                    disabled={isMaintenance}
                                >
                                    Place Order
                                </button>
                            </form>
                        )}
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h2>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            {cartItems.length > 0 ? (
                                <>
                                    {cartItems.map(item => (
                                        <div key={item.id} className="flex justify-between items-center mb-4">
                                            <div className={'flex space-x-4 items-center'}>
                                                <div>
                                                    <img
                                                        src={'https://arabicawhite.s3.amazonaws.com/afg/' + item.image[0]}
                                                        alt={item.title}
                                                        className="w-20 h-20 object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                                                    <p className="text-gray-600">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-lg text-gray-800 font-semibold">${item.price * item.quantity}</p>
                                                <button
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    className="text-red-500 hover:underline"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <hr className="my-4" />
                                    <div className="flex justify-between items-center">
                                        <p className="text-lg font-semibold text-gray-800">Total Price:</p>
                                        <p className="text-lg font-semibold text-gray-800">${getTotalPrice()}</p>
                                    </div>
                                </>
                            ) : (
                                <p className="text-gray-500">Your cart is empty.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="flex flex-col bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
                        <h2 className="text-2xl font-semibold mb-4">Thank You for Your Order!</h2>
                        <p className="text-gray-700 mb-6">Your order has been placed successfully, Your delivery is on the way.</p>
                        <button
                            onClick={closePopup}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Checkout;
