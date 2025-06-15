import { useState, useRef } from "react";
import { Products } from "./Products.js";
import { MdOutlineRemoveRedEye, MdArrowForward, MdArrowBack, MdSearch, MdClose } from "react-icons/md";
import { notify } from '../../utils/Notify.js';
import { motion, AnimatePresence } from "framer-motion";

const Shop = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const imageRef = useRef(null);

    const productsPerPage = 9;

    const handleQuickLook = (product) => {
        setSelectedProduct(product);
        setCurrentImageIndex(0);
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

    const handleImageClick = () => {
        if (imageRef.current) {
            if (imageRef.current.requestFullscreen) {
                imageRef.current.requestFullscreen();
            } else if (imageRef.current.mozRequestFullScreen) {
                imageRef.current.mozRequestFullScreen();
            } else if (imageRef.current.webkitRequestFullscreen) {
                imageRef.current.webkitRequestFullscreen();
            } else if (imageRef.current.msRequestFullscreen) {
                imageRef.current.msRequestFullscreen();
            }
        }
    };

    return (
        <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-center mb-12 text-gray-800"
                >
                    Shop Our Products
                </motion.h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Mobile Filter Toggle */}
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="lg:hidden flex items-center justify-center space-x-2 bg-[#7cc24e] text-white px-4 py-2 rounded-lg"
                    >
                        <MdSearch className="text-xl" />
                        <span>Filters</span>
                    </button>

                    {/* Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`lg:w-1/4 ${isFilterOpen ? 'block' : 'hidden'} lg:block`}
                    >
                        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800">Search Products</h3>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7cc24e] focus:border-transparent"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                    <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
                                <select
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7cc24e] focus:border-transparent"
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
                                    <option value="cookie">Cookie</option>
                                    <option value="Fish">Fish</option>
                                </select>
                            </div>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Special Offer!</h3>
                                <p className="text-yellow-700">Check out our latest deals and promotions. Don't miss out!</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Main Content */}
                    <div className="lg:w-3/4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <AnimatePresence>
                                {currentProducts.map((product, index) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        key={product.id}
                                        className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                                    >
                                        <div className="relative group">
                                            <img
                                                className="w-full h-64 object-cover"
                                                src={'https://arabicawhite.s3.amazonaws.com/afg/' + product.image[0]}
                                                alt={product.title}
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                                                <button
                                                    onClick={() => handleQuickLook(product)}
                                                    className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-[#7cc24e] text-white px-4 py-2 rounded-full flex items-center space-x-2"
                                                >
                                                    <MdOutlineRemoveRedEye />
                                                    <span>Quick Look</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h2 className="text-xl font-bold mb-2 text-gray-800">{product.title}</h2>
                                            <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                                            <div className="flex justify-end">
                                                <button
                                                    onClick={() => handleAddToCart(product, 1)}
                                                    className="bg-[#7cc24e] hover:bg-[#6baa42] text-white px-4 py-2 rounded-lg transition-colors duration-300"
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Pagination */}
                        {filteredProducts.length > productsPerPage && (
                            <div className="flex justify-center mt-12 space-x-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                                        currentPage === 1
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-gray-700 hover:bg-[#7cc24e] hover:text-white'
                                    }`}
                                >
                                    Previous
                                </button>

                                {Array.from({ length: totalPages }, (_, index) => {
                                    const pageNumber = index + 1;
                                    const startPage = Math.max(1, currentPage - 2);
                                    const endPage = Math.min(totalPages, currentPage + 2);

                                    if (pageNumber >= startPage && pageNumber <= endPage) {
                                        return (
                                            <button
                                                key={pageNumber}
                                                onClick={() => handlePageChange(pageNumber)}
                                                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                                                    currentPage === pageNumber
                                                        ? 'bg-[#7cc24e] text-white'
                                                        : 'bg-white text-gray-700 hover:bg-[#7cc24e] hover:text-white'
                                                }`}
                                            >
                                                {pageNumber}
                                            </button>
                                        );
                                    }
                                    return null;
                                })}

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                                        currentPage === totalPages
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-gray-700 hover:bg-[#7cc24e] hover:text-white'
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Product Quick Look Modal */}
            <AnimatePresence>
                {selectedProduct && (
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
                            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">{selectedProduct.title}</h2>
                                    <button
                                        onClick={closeModal}
                                        className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                                    >
                                        <MdClose className="text-2xl" />
                                    </button>
                                </div>

                                <div className="relative mb-6">
                                    <img
                                        ref={imageRef}
                                        onClick={handleImageClick}
                                        className="w-full h-96 object-cover rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105"
                                        src={'https://arabicawhite.s3.amazonaws.com/afg/' + selectedProduct.image[currentImageIndex]}
                                        alt={selectedProduct.title}
                                    />
                                    {selectedProduct.image.length > 1 && (
                                        <>
                                            <button
                                                onClick={handlePreviousImage}
                                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-300"
                                            >
                                                <MdArrowBack className="text-2xl" />
                                            </button>
                                            <button
                                                onClick={handleNextImage}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-300"
                                            >
                                                <MdArrowForward className="text-2xl" />
                                            </button>
                                        </>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <p className="text-gray-600">{selectedProduct.description}</p>
                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => handleAddToCart(selectedProduct, 1)}
                                            className="bg-[#7cc24e] hover:bg-[#6baa42] text-white px-6 py-3 rounded-lg transition-colors duration-300"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Shop;
