import { BsCart } from "react-icons/bs";
import logo from "../../assets/AFfOOD.png";
import { useNavigate } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useState, useEffect } from "react";
import { IoLocationSharp, IoMailUnread } from "react-icons/io5";
import { MdOutlineLocalPhone } from "react-icons/md";

const Header = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleMenuClick = (path) => {
        navigate(path);
        setIsMobileMenuOpen(false);
    };

    const menues = [
        {
            label: 'Home',
            path: '/'
        },{
            label: 'About',
            path: 'about'
        },{
            label: 'Contact',
            path: 'contact'
        },
    ];

    return (
        <header className={`fixed w-full z-50 transition-all duration-300 ${
            isScrolled ? 'bg-black/95 backdrop-blur-sm' : 'bg-black'
        }`}>
            {/* Address Info (Hidden on mobile) */}
            <div className={'hidden md:block border-b border-b-0.5 border-b-[#7cc24e]'}>
                <ul className={'hidden lg:flex space-x-8 font-extralight text-sm text-gray-300 container mx-auto items-center justify-center py-3'}>
                    <li>
                        <div className={'flex items-center space-x-2 hover:text-[#7cc24e] transition-colors duration-300'}>
                            <IoLocationSharp className={'text-[#7cc24e]'}/>
                            <span>584 Pembina hwy</span>
                        </div>
                    </li>

                    <li>
                        <div className={'flex items-center space-x-2 hover:text-[#7cc24e] transition-colors duration-300'}>
                            <IoLocationSharp className={'text-[#7cc24e]'}/>
                            <span>245 Notre Dame Ave</span>
                        </div>
                    </li>

                    <li>
                        <div className={'flex items-center space-x-2 hover:text-[#7cc24e] transition-colors duration-300'}>
                            <IoMailUnread className={'text-[#7cc24e]'}/>
                            <span>contact@africafoodgeneral.com</span>
                        </div>
                    </li>

                    <li>
                        <div className={'flex items-center space-x-2 hover:text-[#7cc24e] transition-colors duration-300'}>
                            <MdOutlineLocalPhone className={'text-[#7cc24e]'}/>
                            <span>+1 (204) 414 9226</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div className={'container mx-auto flex justify-between items-center px-4 py-4'}>
                <div onClick={() => navigate('/')} className={'cursor-pointer transform hover:scale-105 transition-transform duration-300'}>
                    <img src={logo} width={100} alt="logo" className="drop-shadow-lg"/>
                </div>

                {/* Mobile Menu Toggle Button */}
                <div className="lg:hidden">
                    <button 
                        onClick={toggleMobileMenu} 
                        aria-label="Toggle Menu"
                        className="p-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
                    >
                        {isMobileMenuOpen ? 
                            <HiX className="text-3xl text-[#7cc24e]"/> : 
                            <HiMenuAlt3 className="text-3xl text-white"/>
                        }
                    </button>
                </div>

                {/* Desktop Menu */}
                <ul className={'hidden lg:flex items-center space-x-8'}>
                    {menues.map((item, index) => (
                        <li 
                            key={index}
                            onClick={() => handleMenuClick(item.path)}
                            className={'relative group cursor-pointer'}
                        >
                            <div className="text-xl text-white transition-all duration-300 group-hover:text-[#7cc24e]">
                                {item.label}
                            </div>
                            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#7cc24e] transition-all duration-300 group-hover:w-full"></div>
                        </li>
                    ))}
                </ul>

                {/* Mobile Sidebar Menu */}
                <div
                    className={`fixed top-0 left-0 w-64 h-full bg-black/95 backdrop-blur-sm shadow-lg transform ${
                        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 ease-in-out lg:hidden z-50`}
                >
                    <div className="p-6">
                        <div className="flex justify-end mb-8">
                            <button 
                                onClick={toggleMobileMenu}
                                className="p-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
                            >
                                <HiX className="text-3xl text-[#7cc24e]"/>
                            </button>
                        </div>
                        <ul className={'flex flex-col items-start space-y-6'}>
                            {menues.map((item, index) => (
                                <li 
                                    key={index}
                                    onClick={() => handleMenuClick(item.path)}
                                    className="w-full"
                                >
                                    <div className="text-xl text-white hover:text-[#7cc24e] transition-colors duration-300 cursor-pointer">
                                        {item.label}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
