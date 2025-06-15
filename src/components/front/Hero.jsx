import React from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail, MdShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
    const navigate = useNavigate();
    
    return (
        <section id="home" className="relative bg-hero-pattern bg-cover bg-center h-[600px] md:h-[700px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
            
            <div className="relative h-full flex items-center justify-center">
                <div className="container mx-auto px-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center text-center space-y-6"
                    >
                        <motion.div 
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full"
                        >
                            <MdShoppingCart className="text-[#7cc24e] text-xl" />
                            <p className="text-white font-medium">No. 1 African Grocery Store</p>
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
                        >
                            Africa Food General
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-lg md:text-xl text-gray-200 max-w-2xl"
                        >
                            Your premier destination for authentic African groceries and ingredients
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="flex flex-col sm:flex-row gap-4 mt-8"
                        >
                            <a 
                                href="//maps.google.com/?q=Africafoodgeneral"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-center space-x-2 bg-[#7cc24e] hover:bg-[#6baa42] text-white px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105"
                            >
                                <FaLocationDot className="text-xl" />
                                <span className="font-medium">Find Our Location</span>
                            </a>

                            <a 
                                href="mailto:africafoodgeneral@gmail.com"
                                className="group flex items-center justify-center space-x-2 bg-transparent border-2 border-white hover:bg-white hover:text-black text-white px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105"
                            >
                                <MdEmail className="text-xl" />
                                <span className="font-medium">Contact Us</span>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="fixed top-1/4 right-4 z-40"
            >
                <button
                    onClick={() => navigate('/checkout')}
                    className="group flex items-center space-x-3 bg-[#7cc24e] hover:bg-[#6baa42] text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                    <MdShoppingCart className="text-xl" />
                    <span className="font-medium">Proceed to Checkout</span>
                </button>
            </motion.div>
        </section>
    );
};

export default Hero;
