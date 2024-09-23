import { ImLocation } from "react-icons/im";
import { MdPhoneInTalk } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { LuCalendarClock } from "react-icons/lu";
import SubHeader from "../../components/front/SubHeader.jsx";
import React from "react";
import {GoArrowRight} from "react-icons/go";

const Contact = () => {
    return (
        <section>
            <SubHeader title="Contact" content="Got questions? Please feel free to use any of the below medium to contact us for all your concerns" />
            <div className={'container mx-auto p-4'}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-20">
                    <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-xl shadow-md">
                        <div className="bg-gray-100 p-5 rounded-full text-3xl">
                            <ImLocation/>
                        </div>
                        <span className="text-xl text-primary font-bold">Our Location</span>
                        <ul className="flex flex-col text-center">
                            <li className="text-gray-600 text-lg">245 Notre Dame Ave</li>
                            <li className="text-gray-600 text-lg">584 Pembina Hwy</li>
                        </ul>
                    </div>

                    <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-xl shadow-md">
                        <div className="bg-gray-100 p-5 rounded-full text-3xl">
                            <MdPhoneInTalk/>
                        </div>
                        <span className="text-xl text-primary font-bold">Contact Number</span>
                        <ul className="flex flex-col text-center">
                            <li className="text-gray-600 text-lg">+1 (204) 414 9226</li>
                            <li className="text-gray-600 text-lg">+1 (204) 963 3880</li>
                        </ul>
                    </div>

                    <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-xl shadow-md">
                        <div className="bg-gray-100 p-5 rounded-full text-3xl">
                            <IoMdMail/>
                        </div>
                        <span className="text-xl text-primary font-bold">Our Email</span>
                        <ul className="flex flex-col text-center">
                            <li className="text-gray-600 text-lg">contact@africafoodgeneral.com</li>
                        </ul>
                    </div>

                    <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-xl shadow-md">
                        <div className="bg-gray-100 p-5 rounded-full text-3xl">
                            <LuCalendarClock/>
                        </div>
                        <span className="text-xl text-primary font-bold">Visit Between</span>
                        <ul className="flex flex-col text-center">
                            <li className="text-gray-600 text-lg">Mon - Sat: 8:00am - 5:00pm</li>
                            <li className="text-gray-600 text-lg">24/7 Automated Service</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;