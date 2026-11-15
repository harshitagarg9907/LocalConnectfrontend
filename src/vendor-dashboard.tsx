import { NavLink, Outlet } from "react-router-dom";
import "./vendordashboard.css";
import DashboardNavbar from "./dashboardnavbar";

function VendorDashboard() {

    return (
     <>
     <DashboardNavbar/>
        <div className="vendor-dashboard">

            <div className="vendor-sidebar">

                <h2>LocalConnect</h2>

                <h3>Contents</h3>

                <NavLink to="registration">
                    {/*Navbar: This creates a clickable link in your left sidebar.the regirstration here points to doregister function 
                
                */  }  Vendor Registration
                </NavLink>    

            </div>

            <div className="vendor-content">

                <Outlet />
                {/*Outlet displays the child route's component without replacing the parent dashboard.
//Outlet is required in a parent component whenever you want its nested child route to appear inside that parent.
     */}       </div>

        </div>
        </>
    );
}

export default VendorDashboard;