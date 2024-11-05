import { useState, useRef } from "react";
import { Products } from "./Products.js";
import { MdOutlineRemoveRedEye, MdArrowForward, MdArrowBack } from "react-icons/md";
import { notify } from '../../utils/Notify.js';

const Shop = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const imageRef = useRef(null); // Reference to the modal image for full-screen functionality

    const productsPerPage = 9;

    const handleQuickLook = (product) => {
        setSelectedProduct(product);
        setCurrentImageIndex(0); // Reset to first image
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
        setCurrentPage(1);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setCurrentPage(1);
    };

    const filteredProducts = Products.filter(product =>
        (selectedCategory === "all" || product.category === selectedCategory) &&
        (product.title.toLowerCase().includes(searchQuery) || product.description.toLowerCase().includes(searchQuery))
    );

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const currentProducts = filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleAddToCart = (product, quantity) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProductIndex = cart.findIndex(item => item.id === product.id);

        if (existingProductIndex >= 0) {
            cart[existingProductIndex].quantity += quantity;
        } else {
            cart.push({ ...product, quantity });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        closeModal();

        notify("Item added to cart.", { type: 'success' });
    };

    const handleNextImage = () => {
        if (selectedProduct) {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedProduct.image.length);
        }
    };

    const handlePreviousImage = () => {
        if (selectedProduct) {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + selectedProduct.image.length) % selectedProduct.image.length);
        }
    };

    // Handle Full-Screen Image
    const handleImageClick = () => {
        if (imageRef.current) {
            if (imageRef.current.requestFullscreen) {
                imageRef.current.requestFullscreen();
            } else if (imageRef.current.mozRequestFullScreen) { // Firefox
                imageRef.current.mozRequestFullScreen();
            } else if (imageRef.current.webkitRequestFullscreen) { // Chrome, Safari, and Opera
                imageRef.current.webkitRequestFullscreen();
            } else if (imageRef.current.msRequestFullscreen) { // IE/Edge
                imageRef.current.msRequestFullscreen();
            }
        }
    };

    return (
        <section className="bg-gray-100 py-12">
            <div className="container mx-auto px-6">
                <h1 className="text-center text-3xl font-semibold mb-8 text-gray-800">Shop Products</h1>

                <div className="flex flex-col md:flex-row md:space-x-6">
                    {/* Sidebar for Search, Category, and Commercial */}
                    <div className="bg-white shadow  p-5 h-full rounded-lg md:w-1/4 mb-8">
                        <p className={'py-2 font-bold'}>Product Search</p>
                        {/* Search Input */}
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="border border-gray-300 rounded-lg p-2 w-full mb-4"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />

                        {/* Category Filter */}
                        <div className="border border-gray-300 rounded-lg p-4 mb-4">
                            <h3 className="text-lg font-semibold mb-4">Categories</h3>
                            <select
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                className="border border-gray-300 rounded-lg p-2 w-full"
                            >
                                <option value="all">All Categories</option>
                                <option value="Rice">Rice</option>
                                <option value="Beans">Beans</option>
                                <option value="Garri">Garri</option>
                                <option value="Powder">Powder</option>
                                <option value="Noodles">Noodles</option>
                                <option value="Flour">Flour</option>
                                <option value="spice">Spice</option>
                                <option value="Oil">Oil</option>
                                <option value="Chops">Chops</option>
                                <option value="Meat">Meat</option>
                                <option value="Liquid">Liquid</option>
                                <option value="Candy">Candy</option>
                                <option value="cookie">cookie</option>
                                <option value="Fish">Fish</option>
                                <option value="Meat">Meat</option>
                                {/* Add more categories as needed */}
                            </select>
                        </div>

                        {/* Commercial Space */}
                        <div className="bg-yellow-200 border border-yellow-400 rounded-lg p-4 mb-4">
                        <h3 className="text-lg font-semibold mb-4">Special Offer!</h3>
                            <p className="text-gray-700">Check out our latest deals and promotions. Don't miss out!</p>
                            {/* Add more promotional content or images here */}
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="md:w-3/4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {currentProducts.length > 0 ? (
                                currentProducts.map((product, index) => (
                                    <div
                                        className="bg-white rounded-lg shadow-md overflow-hidden transform transition"
                                        key={index}
                                    >
                                        <img
                                            className="w-full h-56 object-cover"
                                            src={'https://arabicawhite.s3.amazonaws.com/afg/' + product.image[0]}
                                            alt={product.title}
                                        />
                                        <div className="p-4">
                                            <h2 className="text-lg font-bold mb-2 text-gray-700">{product.title}</h2>
                                            <p className="text-sm text-gray-600">{product.description.split(' ').slice(0, 10).join(' ')}{product.description.split(' ').length > 10 ? '...' : ''}</p>
                                            <div className="flex justify-between items-center mt-4">
                                                <button
                                                    onClick={() => handleQuickLook(product)}
                                                    className="flex space-x-2 items-center bg-[#7cc24e] hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition text-sm"
                                                >
                                                    <MdOutlineRemoveRedEye />
                                                    <span>Quick Look</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-4 text-center text-gray-500">
                                    No products found.
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {filteredProducts.length > productsPerPage && (
                            <div className="flex justify-center mt-8 space-x-2">
                                {/* Previous Button */}
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className={`px-3 py-2 border rounded-lg ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>

                                {/* Pagination Numbers */}
                                {Array.from({ length: totalPages }, (_, index) => {
                                    const pageNumber = index + 1;
                                    const startPage = Math.max(1, currentPage - 2); // Calculate the first page to show
                                    const endPage = Math.min(totalPages, currentPage + 2); // Calculate the last page to show

                                    if (pageNumber >= startPage && pageNumber <= endPage) {
                                        return (
                                            <button
                                                key={pageNumber}
                                                onClick={() => handlePageChange(pageNumber)}
                                                className={`mx-1 px-3 py-2 border rounded-lg ${currentPage === pageNumber ? 'bg-[#7cc24e] text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
                                            >
                                                {pageNumber}
                                            </button>
                                        );
                                    }

                                    return null; // Hide pages outside the range
                                })}

                                {/* Next Button */}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className={`px-3 py-2 border rounded-lg ${currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            {selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold text-gray-800">{selectedProduct.title}</h2>
                            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                                ✕
                            </button>
                        </div>

                        <div className="relative">
                            <img
                                ref={imageRef} // Reference for full-screen mode
                                onClick={handleImageClick} // Click to go full-screen
                                className="w-full h-64 object-cover rounded mb-4 cursor-pointer transition duration-300"
                                src={'https://arabicawhite.s3.amazonaws.com/afg/' + selectedProduct.image[currentImageIndex]}
                                alt={selectedProduct.title}
                            />

                            {/* Previous Button */}
                            {selectedProduct.image.length > 1 && (
                                <button
                                    onClick={handlePreviousImage}
                                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
                                >
                                    <MdArrowBack size={24} />
                                </button>
                            )}

                            {/* Next Button */}
                            {selectedProduct.image.length > 1 && (
                                <button
                                    onClick={handleNextImage}
                                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
                                >
                                    <MdArrowForward size={24} />
                                </button>
                            )}
                        </div>

                        <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                        <div className="flex items-center mb-4">
                            <label htmlFor="quantity" className="mr-2 text-gray-700">Quantity:</label>
                            <input
                                type="number"
                                id="quantity"
                                className="border border-gray-300 rounded-lg p-2 w-20"
                                min="1"
                                defaultValue="1"
                            />
                        </div>
                        <button
                            onClick={() => handleAddToCart(selectedProduct, parseInt(document.getElementById('quantity').value))}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition text-sm"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            )}

        </section>
    );
};

export default Shop;
