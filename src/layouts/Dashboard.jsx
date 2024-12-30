import Sidebar from "../components/dashboard/Sidebar.jsx";
import {Outlet} from "react-router-dom";
import Header from "../components/dashboard/Header.jsx";

const Dashboard = () => {
    return (
        <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
            <Sidebar/>
            <div className='flex-1'>
                <Header />
                <div className='p-4'>{<Outlet/>}</div>
            </div>
        </div>
    );
};

export default Dashboard;