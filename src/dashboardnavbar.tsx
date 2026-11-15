import { useNavigate } from "react-router-dom";
import "./dashboardnavbar.css";

function DashboardNavbar() {

    const navigate = useNavigate();

    function handleLogout() { // we defined this function out bcz JSX expects elements and expressions, not function declarations.
        localStorage.removeItem("token");
        navigate("/login", { replace: true });//It redirects to Login and replaces the current history entry. I
    }

    return (
        <div className="dashboard-navbar">

            <h2>LocalConnect</h2>

            <button onClick={handleLogout}>
                Logout
            </button>

        </div>
    );
}

export default DashboardNavbar;