import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notify } from "../../utils/Notify.js";

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
    });
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isMaintenance, setIsMaintenance] = useState(true); // New state for maintenance
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
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

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Disable form submission if under maintenance
        if (isMaintenance) {
            notify("Checkout is currently under maintenance", { type: "warning" });
            return;
        }

        const orderDetails = {
            formData,
            cartItems,
            totalPrice: getTotalPrice(),
        };

        console.log("Order Details: ", orderDetails);
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
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shipping Information</h2>
                        <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-lg shadow-md">
                            <div className="mb-4">
                                <label htmlFor="fullName" className="block text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                    required
                                    disabled={isMaintenance}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                    required
                                    disabled={isMaintenance}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="address" className="block text-gray-700">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                    required
                                    disabled={isMaintenance}
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label htmlFor="city" className="block text-gray-700">City</label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-2"
                                        required
                                        disabled={isMaintenance}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="postalCode" className="block text-gray-700">Postal Code</label>
                                    <input
                                        type="text"
                                        id="postalCode"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-2"
                                        required
                                        disabled={isMaintenance}
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="country" className="block text-gray-700">Country</label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                    required
                                    disabled={isMaintenance}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                                disabled={!isMaintenance}
                            >
                                Place Order
                            </button>
                        </form>
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
                                                        className="w-16 h-16 object-cover rounded"
                                                    />
                                                </div>
                                                <h3 className="text-gray-800">{item.title}</h3>
                                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveItem(item.id)}
                                                className="text-red-500 px-3 py-1 rounded-lg"
                                                disabled={isMaintenance}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <div className="flex justify-between mt-4 text-lg font-semibold text-gray-800">
                                        <p>Number of Items:</p>
                                        <p>{cartItems.length}</p>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center text-gray-500">
                                    Your cart is empty.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {showConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-semibold mb-4">Order Placed Successfully!</h2>
                        <p className="mb-4">Your Order has been placed successfully, you will be contacted shortly for delivery</p>
                        <button
                            onClick={closePopup}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Checkout;
