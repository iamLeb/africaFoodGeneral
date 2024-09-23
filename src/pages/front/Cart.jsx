import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, []);

    const handleQuantityChange = (id, newQuantity) => {
        const updatedCart = cartItems.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const handleRemoveItem = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const handleCheckout = () => {
        // Handle checkout logic here (e.g., navigate to a checkout page)
        navigate("/checkout");
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <section className="bg-gray-100 py-20">
            <div className="container mx-auto px-6">
                <h1 className="text-center text-3xl font-semibold mb-8 text-gray-800">Your Cart</h1>

                {cartItems.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 gap-8">
                            {cartItems.map((item) => (
                                <div key={item.id} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                                    <img
                                        src={'https://arabicawhite.s3.amazonaws.com/afg/' + item.image}
                                        alt={item.title}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1 mx-4">
                                        <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                                        <p className="text-gray-600 flex-wrap">{item.short}</p>
                                    </div>
                                    <div className="flex flex-col md:flex-row items-center space-x-4">
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                            className="border border-gray-300 rounded-lg p-2 w-16 text-center"
                                        />
                                        <button
                                            onClick={() => handleRemoveItem(item.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 flex justify-between items-center">
                            <h2 className="text-2xl font-semibold text-gray-800">Total: ${getTotalPrice().toFixed(2)}</h2>
                            <button
                                onClick={handleCheckout}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center text-gray-500">
                        Your cart is empty.
                    </div>
                )}
            </div>
        </section>
    );
};

export default Cart;
