import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "../components/front/Header.jsx";
import Footer from "../components/front/Footer.jsx";

const FrontLayout = () => {

    return (
        <div>
            <Header />
            <main className={'pt-20'}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default FrontLayout;