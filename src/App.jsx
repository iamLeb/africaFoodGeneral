import {BrowserRouter, Route, Routes} from "react-router-dom";
import FrontLayout from "./layouts/FrontLayout.jsx";
import Home from "./pages/front/Home.jsx";
import Cart from "./pages/front/Cart.jsx";
import Checkout from "./pages/front/Checkout.jsx";
import ScrollToTop from "./components/ScrollToTop.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import About from "./pages/front/About.jsx";
import Contact from "./pages/front/Contact.jsx";
import Login from "./pages/auth/Login.jsx";
import Dashboard from "./layouts/Dashboard.jsx";
import Index from "./pages/dashboard/Index.jsx";
import Maintenance from "./pages/front/MaintenancePage.jsx";

function App() {

  return (
    <BrowserRouter>
    <ScrollToTop />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<FrontLayout />}>
          {/* <Route index element={<Home />} /> */}
          <Route index element={<Maintenance />} />
          <Route path={'/about'} element={<About />} />
          <Route path={'/contact'} element={<Contact />} />
          <Route path={'/cart'} element={<Cart />} />
          <Route path={'/checkout'} element={<Checkout />} />
          <Route path={'/secure/login'} element={<Login />} /> 
        </Route>

        <Route path="/secure" element={<Dashboard />}>
          <Route index element={<Index />} />
          <Route path={'customers'} element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
