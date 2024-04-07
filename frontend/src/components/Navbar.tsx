import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAppDispatch } from '../hooks/useTypedSelector';
import { logoutUser } from '../features/userSlice';
import SuperAdminDropdown from './admin/SuperAdminDropdown';
import AdminDropdown from './admin/AdminDropdown';
import { clearState } from '../utils/clearState';
import OrganizationAdmin from './admin/OrganizationAdmin';
import OwnerDropdown from './admin/OwnerDropdown';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, isSuperAdminRoleExists, isAdminRoleExists, isOrganizationAdminExists, isOwnerExists } = useAuth();

  const logOutUser = async () => {
    try {
			clearState();
      await dispatch(logoutUser());
      navigate('/login')
    } catch (error) {
      
    }
  }

  return (
    <>
      <header className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">
				<Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" to="#">School Management App</Link>

				{isAuthenticated && isSuperAdminRoleExists && <SuperAdminDropdown />}
				{isAuthenticated && isOrganizationAdminExists && <AdminDropdown />}
				{/* {isAuthenticated && isOrganizationAdminExists && <OrganizationAdmin />} */}
				{isAuthenticated && isOwnerExists && <OwnerDropdown />}

				<nav className="nav ms-auto">
					{isAuthenticated ? (
						<>
							<Link className="nav-link text-white" to="/">Home</Link>
							<Link className="nav-link text-white" to="/list">List</Link>
							<button className='btn btn-danger' onClick={() => logOutUser()}>Logout</button>
						</>
					) : (
						<>
							<Link className="nav-link text-white" to="/signup">Sign Up</Link>
							<Link className="nav-link text-white" to="/login">Login</Link>
						</>
					)}
					
				</nav>

				<ul className="navbar-nav flex-row d-md-none">
					<li className="nav-item text-nowrap">
						<button className="nav-link px-3 text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSearch" aria-controls="navbarSearch" aria-expanded="false" aria-label="Toggle search">
							<svg className="bi"><use xlinkHref="#search"/></svg>
						</button>
					</li>
					<li className="nav-item text-nowrap">
						<button className="nav-link px-3 text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
							<svg className="bi"><use xlinkHref="#list"/></svg>
						</button>
					</li>
				</ul>

				<div id="navbarSearch" className="navbar-search w-100 collapse">
					<input className="form-control w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search" />
				</div>
			</header>
    </>
  );
};

export default Navbar;
