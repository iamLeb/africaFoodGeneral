import { useState, useEffect } from 'react';
import api from "../../services/api.js";

const Index = () => {
    const [customers, setCustomers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const getCustomers = async () => {
        try {
            const response = await api.get('/customers');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCustomers();
        // Placeholder data; replace with real data fetching logic
        const fetchedCustomers = [
            { id: 1, name: 'Alice', email: 'alice@example.com' },
            { id: 2, name: 'Bob', email: 'bob@example.com' },
        ];

        const fetchedOrders = [
            { id: 1, customerId: 1, product: 'Product A', quantity: 2 },
            { id: 2, customerId: 1, product: 'Product B', quantity: 1 },
            { id: 3, customerId: 2, product: 'Product C', quantity: 4 },
            { id: 4, customerId: 2, product: 'Product D', quantity: 3 },
        ];

        setCustomers(fetchedCustomers);
        setOrders(fetchedOrders);
    }, []);

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 max-w-screen-lg mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-center">Admin Dashboard</h1>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search customers..."
                className="mb-4 p-2 border rounded w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                        <div key={customer.id} className="mb-8 border rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
                            <h2 className="text-xl font-semibold">{customer.name} ({customer.email})</h2>
                            <p className="text-gray-600">Customer ID: {customer.id}</p>

                            <div className="mt-4">
                                <h3 className="text-lg font-medium mb-2">Orders</h3>
                                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                                    <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 border">Order ID</th>
                                        <th className="px-4 py-2 border">Product</th>
                                        <th className="px-4 py-2 border">Quantity</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {orders.filter(order => order.customerId === customer.id).map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50 transition">
                                            <td className="px-4 py-2 border">{order.id}</td>
                                            <td className="px-4 py-2 border">{order.product}</td>
                                            <td className="px-4 py-2 border">{order.quantity}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                {orders.filter(order => order.customerId === customer.id).length === 0 && (
                                    <p className="text-gray-500 mt-2">No orders found for this customer.</p>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500 text-center mt-8">No customers found.</div>
                )
            )}
        </div>
    );
};

export default Index;
