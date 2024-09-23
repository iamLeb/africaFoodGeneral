import logo from "../../assets/AFfOOD.png";
const Footer = () => {
    return (
        <footer className="shadow bg-[#061d24]">
            <div className="w-full mx-auto max-w-screen-xl p-4 flex justify-center md:items-center md:justify-between">
                <div className={'overflow-hidden w-40'}>
                    <img className={'w-full h-full object-center object-cover cursor-pointer'}
                         src={logo} alt=""/>
                </div>
                <ul className="hidden md:flex justify-center space-x-2 items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <div className="cursor-pointer hover:text-white transition-all duration-300 me-4 md:me-6">
                            Copyright © 2023 Africa Food General Inc. All Rights Reserved
                        </div>
                    </li>
                </ul>

            </div>
        </footer>
    );
};

export default Footer;