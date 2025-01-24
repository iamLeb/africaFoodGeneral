import React from 'react';
import Snowfall from 'react-snowfall'; // Import the Snowfall component
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail, MdShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();
    return (
        <section id={'home'} className="relative bg-hero-pattern bg-cover bg-center h-full md:h-full">
            <Snowfall color="white" snowflakeCount={100} /> {/* Add Snowfall effect */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className={'flex justify-center items-center h-[400px] md:h-[600px] text-white relative '}>
                <div className={'flex flex-col gap-2 items-center text-center px-1'}>
                    <div className={'flex space-x-4 items-center'}>
                        <MdShoppingCart />
                        <p>No. 1 Grocery Store</p>
                    </div>
                    <h1 className={'text-2xl md:text-6xl text-center font-bold'}>Africa Food General</h1>
                    <p className={'text-xs md:text-md font-light'}>Your best place for Grocery Shopping</p>
                    <div className={'flex'}>
                        <a target={'_blank'} href={'//maps.google.com/?q=Africafoodgeneral'}
                            className={'flex justify-center items-center space-x-4 hover:bg-[#7cc24e] transition-all duration-300 rounded-sm bg-primary text-white px-3 py-3 md:px-9 md:py-4 rounded-l-full'}>
                            <FaLocationDot />
                            <span>Locate Us</span>
                        </a>

                        <a target={'_blank'} href={'mailto:africafoodgeneral@gmail.com'}
                            className={'flex justify-center items-center space-x-4 rounded-sm border border-primary text-white hover:text-black hover:bg-white transition-all duration-300 px-3 py-3 md:px-9 md:py-4 rounded-r-full'}>
                            <MdEmail />
                            <span>Contact us</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className={'fixed flex flex-col gap-1 top-1/4 right-0 z-40'}>
                <button
                    onClick={() => navigate(('/checkout'))}
                    className={'shake-button flex items-center space-x-6 px-2 md:px-5 bg-[#7cc24e] text-white py-2'}
                >
                    <MdShoppingCart />
                    Proceed to Checkout
                </button>
            </div>

        </section>
    );
};

export default Hero;
