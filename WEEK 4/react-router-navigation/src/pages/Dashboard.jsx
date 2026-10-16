import { NavLink, Outlet } from "react-router-dom";

function Dashboard() {
    return (
        <div>
            <h2>Dashboard</h2>
            <nav className="navigation">
                <NavLink
                    to="/dashboard/overview"
                    className={({ isActive }) => (isActive ? "active" : "")} >
                    Overview
                </NavLink>
                <NavLink
                    to="/dashboard/settings"
                    className={({ isActive }) => (isActive ? "active" : "")} >
                    Settings
                </NavLink>
            </nav>
            <Outlet />
        </div>
    );
}

export default Dashboard;