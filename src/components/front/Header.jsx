import { BsCart } from "react-icons/bs";
import logo from "../../assets/AFfOOD.png";
import { useNavigate } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useState } from "react";
import { IoLocationSharp, IoMailUnread } from "react-icons/io5";
import { MdOutlineLocalPhone } from "react-icons/md";

const Header = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleMenuClick = (path) => {
        navigate(path);
        setIsMobileMenuOpen(false);  // Close the menu after navigation
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
        <header className={'fixed w-full z-50 bg-black p-5 shadow'}>
            {/* Address Info (Hidden on mobile) */}
            <div className={'hidden md:block border-b border-b-0.5 border-b-[#7cc24e]'}>
                <ul className={'hidden lg:flex space-x-4 font-extralight text-sm text-gray-300 container mx-auto items-center justify-center pb-3'}>
                    <li>
                        <div className={'flex items-center space-x-2'}>
                            <IoLocationSharp className={'text-[#7cc24e]'}/>
                            <span>584 Pembina hwy</span>
                        </div>
                    </li>

                    <li>
                        <div className={'flex items-center space-x-2'}>
                            <IoLocationSharp className={'text-[#7cc24e]'}/>
                            <span>245 Notre Dame Ave</span>
                        </div>
                    </li>

                    <li>
                        <div className={'flex items-center space-x-2'}>
                            <IoMailUnread className={'text-[#7cc24e]'}/>
                            <span>contact@africafoodgeneral.com</span>
                        </div>
                    </li>

                    <li>
                        <div className={'flex items-center space-x-2'}>
                            <MdOutlineLocalPhone className={'text-[#7cc24e]'}/>
                            <span>+1 (204) 414 9226</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div className={'container mx-auto flex justify-between items-center text-gray-400 pt-0 md:pt-4'}>
                <div onClick={() => navigate('/')} className={'cursor-pointer'}>
                    <img src={logo} width={100} alt="logo"/>
                </div>

                {/* Mobile Menu Toggle Button */}
                <div className="lg:hidden">
                    <button onClick={toggleMobileMenu} aria-label="Toggle Menu">
                        {isMobileMenuOpen ? <HiX className="text-3xl"/> : <HiMenuAlt3 className="text-3xl"/>}
                    </button>
                </div>

                {/* Desktop Menu */}
                <ul className={'hidden lg:flex items-center space-x-6'}>
                    {menues.map((item, index) => (
                        <li className={'text-xl cursor-pointer text-white transition-all duration-300 hover:text-[#7cc24e]'} onClick={() => handleMenuClick(item.path)}
                            key={index}>
                            <div>{item.label}</div>
                        </li>
                    ))}
                </ul>

                {/* Mobile Sidebar Menu */}
                <div
                    className={`z-50 fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform ${
                        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 ease-in-out lg:hidden`}
                >
                    <ul className={'flex flex-col items-start space-y-6 p-6'}>
                        {menues.map((item, index) => (
                            <li className={'cursor-pointer hover:text-black'} onClick={() => handleMenuClick(item.path)} key={index}>
                                <div>{item.label}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
