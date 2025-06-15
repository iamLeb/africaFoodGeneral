import logo from "../../assets/AFfOOD.png";
import { IoLocationSharp, IoMailUnread } from "react-icons/io5";
import { MdOutlineLocalPhone } from "react-icons/md";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#061d24] text-gray-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="w-40">
                            <img 
                                src={logo} 
                                alt="Africa Food General" 
                                className="w-full h-auto object-contain"
                            />
                        </div>
                        <p className="text-sm">
                            Bringing authentic African flavors to your table. Experience the rich culinary heritage of Africa.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-[#7cc24e] transition-colors duration-300">
                                <FaFacebook className="text-xl" />
                            </a>
                            <a href="#" className="hover:text-[#7cc24e] transition-colors duration-300">
                                <FaInstagram className="text-xl" />
                            </a>
                            <a href="#" className="hover:text-[#7cc24e] transition-colors duration-300">
                                <FaTwitter className="text-xl" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/" className="hover:text-[#7cc24e] transition-colors duration-300">Home</a>
                            </li>
                            <li>
                                <a href="/about" className="hover:text-[#7cc24e] transition-colors duration-300">About Us</a>
                            </li>
                            <li>
                                <a href="/contact" className="hover:text-[#7cc24e] transition-colors duration-300">Contact</a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                                <IoLocationSharp className="text-[#7cc24e] mt-1" />
                                <span>584 Pembina hwy, Winnipeg, MB</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <IoLocationSharp className="text-[#7cc24e] mt-1" />
                                <span>245 Notre Dame Ave, Winnipeg, MB</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <IoMailUnread className="text-[#7cc24e] mt-1" />
                                <span>contact@africafoodgeneral.com</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <MdOutlineLocalPhone className="text-[#7cc24e] mt-1" />
                                <span>+1 (204) 414 9226</span>
                            </li>
                        </ul>
                    </div>

                    {/* Business Hours */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Business Hours</h3>
                        <ul className="space-y-2">
                            <li className="flex justify-between">
                                <span>Monday - Friday:</span>
                                <span>9:00 AM - 9:00 PM</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Saturday:</span>
                                <span>10:00 AM - 8:00 PM</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Sunday:</span>
                                <span>11:00 AM - 7:00 PM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm">
                    <p>© {currentYear} Africa Food General Inc. All Rights Reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;