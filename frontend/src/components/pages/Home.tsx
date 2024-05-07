import React, { useEffect, useState } from 'react'
import './Home.css';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { clearClassData, getSchoolClass, resetAddClass, resetAddDept } from '../../features/studentclassSlice';
import store from '../../store/store';
import { getSchoolDepatments, resetDepartment } from '../../features/studentSlice';
import AddStudentClass from '../../modals/AddStudentClass';
import AddSchoolDept from '../../modals/AddSchoolDept';

const Home: React.FC = () => {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { classArms, classMsg } = useAppSelector((state) => state.studentclass)
	const { departments, getDept } = useAppSelector((state) => state.student)

	const { schoolId } = useParams<{ schoolId?: string}>();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);

	const handleAddClassModal = () => {
		// claer
		store.dispatch(resetAddClass())
		setIsModalOpen(true)
	}

	const handleAddDeptModal = () => {
		// claer
		store.dispatch(resetAddDept())
		setIsDeptModalOpen(true)
	}

	const getStudentsInClassArm = (classArmId: string, className: string) => {
		//store.dispatch(clearSchoolUsers())
		navigate('students-in-class-arm', { state: { classArmId, className }})
	}

	useEffect(() => {
		if (!isAuthenticated)
			navigate('/login')
	}, [isAuthenticated, navigate])

	useEffect(() => {
		store.dispatch(clearClassData())
		if (window.location.pathname.includes("school-home-page") && schoolId) {
			// dispatch to get classes and other properties of the school
			dispatch(getSchoolClass(schoolId))
		}
	}, [dispatch, schoolId])

	useEffect(() => {
		store.dispatch(resetDepartment())
		if (window.location.pathname.includes("school-home-page") && schoolId) {
			dispatch(getSchoolDepatments(schoolId))
		}
	}, [dispatch, schoolId])
  
  return (
    <>
			{/* start main content */}
			<div className="container-fluid">
				<div className="row">
					<div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
						<div className="offcanvas-md offcanvas-end bg-body-tertiary" tabIndex={-1} id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
							<div className="offcanvas-header">
								<h5 className="offcanvas-title" id="sidebarMenuLabel">Company name</h5>
								<button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
							</div>
							<div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
								<ul className="nav flex-column">
									<li className="nav-item dropdown">
										<button
											className="nav-link dropdown-toggle d-flex align-items-center gap-2 active"
											type="button"
											id="classSectionDropdown"
											data-bs-toggle="dropdown"
											aria-expanded="false"
										>
											Class Section
										</button>
										<ul className="dropdown-menu" aria-labelledby="classSectionDropdown">
											{classMsg === "success" ? (
												classArms?.map((clas) => (
													<div key={clas.classArmId}>
														<li>
															<Link 
																className="nav-link d-flex align-items-center gap-2" 
																to="#"
																onClick={() => getStudentsInClassArm(clas.classArmId, clas.name)}
															>
																{clas.name}
															</Link>
														</li>
													</div>
												))
											) : (null)}
											<li><Link className="nav-link d-flex align-items-center gap-2" to="#" onClick={handleAddClassModal}>Add New Class</Link></li>
										</ul>
									</li>

									<li className="nav-item dropdown">
										<button
											className="nav-link dropdown-toggle d-flex align-items-center gap-2 active"
											type="button"
											id="classSectionDropdown"
											data-bs-toggle="dropdown"
											aria-expanded="false"
										>
											Department Section
										</button>
										<ul className="dropdown-menu" aria-labelledby="classSectionDropdown">
											{getDept === "success" ? (
												departments?.map((dept) => (
													<div key={dept.departmentId}>
														<li><Link className="nav-link d-flex align-items-center gap-2" to="#">{dept.name}</Link></li>
													</div>
												))
											) : (null)}
											<li><Link className="nav-link d-flex align-items-center gap-2" to="#" onClick={handleAddDeptModal}>Add New Department</Link></li>
										</ul>
									</li>
									<li className="nav-item">
										<Link className="nav-link d-flex align-items-center gap-2 active" aria-current="page" to="#">
											<svg className="bi"><use xlinkHref="#house-fill"/></svg>
											Dashboard
										</Link>
									</li>
								</ul>

								<h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
									<span>Saved reports</span>
									<Link className="link-secondary" to="#" aria-label="Add a new report">
										<svg className="bi"><use xlinkHref="#plus-circle"/></svg>
									</Link>
								</h6>
								<ul className="nav flex-column mb-auto">
									<li className="nav-item">
										<Link className="nav-link d-flex align-items-center gap-2" to="#">
											<svg className="bi"><use xlinkHref="#file-earmark-text"/></svg>
											Current month
										</Link>
									</li>
								</ul>

								<hr className="my-3" />

								<ul className="nav flex-column mb-auto">
									<li className="nav-item">
										<Link className="nav-link d-flex align-items-center gap-2" to="#">
											<svg className="bi"><use xlinkHref="#gear-wide-connected"/></svg>
											Settings
										</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link d-flex align-items-center gap-2" to="#">
											<svg className="bi"><use xlinkHref="#door-closed"/></svg>
											Sign out
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
						{/* main content here */}
						<Outlet />

					</main>
				</div>
			</div>
			{/* end main content */}

			{isModalOpen && (
				<AddStudentClass
					isModalOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
					schoolId={schoolId}
				/>
			)}

			{isDeptModalOpen && (
				<AddSchoolDept 
					isModalOpen={isDeptModalOpen}
					closeModal={() => setIsDeptModalOpen(false)}
					schoolId={schoolId}
				/>
			)}
    </>
  )
}

export default Home