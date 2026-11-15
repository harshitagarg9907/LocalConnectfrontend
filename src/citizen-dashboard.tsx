import { NavLink, Outlet } from "react-router-dom";
import "./citizendashboard.css";
import DashboardNavbar from "./dashboardnavbar";
import { FaHeart, FaSearch, FaUser } from "react-icons/fa";
  //npm install react-icons
  
function CitizenDashboard() {
return (<>
    <DashboardNavbar/>
        <div className="citizen-dashboard">

            <div className="citizen-sidebar">

                <h2>LocalConnect</h2>

                <h3>Contents</h3>

                <NavLink to="favorites">
        <FaHeart /> Favourite Vendors
                </NavLink>

                <NavLink to="search">
                   <FaSearch /> Search Vendors
                </NavLink>

                <NavLink to="details">
                 <FaUser /> Citizen Details
                </NavLink>

            </div>


            <div className="citizen-content">

                <Outlet />

            </div>

        </div>
        </>
    );
}

export default CitizenDashboard;