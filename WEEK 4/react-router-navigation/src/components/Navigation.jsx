import { NavLink } from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <u1>
                <li>
                    <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                        Nested Route Example: Dashboard
                    </NavLink>
                </li>
            </u1>
        </nav>
    );
}

export default Navigation;