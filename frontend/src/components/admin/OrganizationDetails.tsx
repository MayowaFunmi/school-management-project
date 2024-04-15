import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import GetZonesModal from '../../modals/GetZonesModal';
import { OrgData, UserDetails, Zone } from '../../models/userModel';
import AddZoneModal from '../../modals/AddZoneModal';
import store from '../../store/store';
import { getOrganizationZones, resetAllOrgZones } from '../../features/zoneSlice';
import { getOrganizationSchools, getOrganizationUsersByRole, resetOranizationSchool, resetOranizationUsers, resetOrganizationSchool } from '../../features/schoolSlice';
import { clearUserWithRoles, getUserDetails } from '../../features/userSlice';
import UserModal from '../../modals/UserModal';

const OrganizationDetails = () => {
  const location = useLocation();
  const org: OrgData = location.state.org;
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [addZoneModalOpen, setAddZoneModalOpen] = useState(false)
  const [userModalOpen, setUserModalOpen] = useState(false)

  const defaultSize = 2;
  const defaultRole = "TeachingStaff";
  const [pageSize, setPageSize] = useState(defaultSize);
  const [userPageSize, setUserPageSize] = useState(defaultSize);
  const [roleName, setRoleName] = useState<string>(defaultRole);

  const { orgZones, orgZonesMsg } = useAppSelector((state) => state.zone)
  const { pageSchools, status, currentPage, totalPages, pageUsers, userStatus, userCurrentPage, userTotalPages } = useAppSelector((state) => state.school);
  const { userRoleStatus, userWithRoles } = useAppSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(resetOranizationSchool());
    dispatch(getOrganizationSchools({ organizationId: org.organizationUniqueId, page: 1, pageSize }))
  }, [dispatch, org.organizationUniqueId, pageSize])

  useEffect(() => {
    store.dispatch(resetOranizationUsers());
    dispatch(getOrganizationUsersByRole({ organizationId: org.organizationId, roleName, page: 1, userPageSize }))
  }, [dispatch, org.organizationId, roleName, userPageSize])

  const handleNextPage = () => {
    dispatch(getOrganizationSchools({ organizationId: org.organizationUniqueId, page: currentPage + 1, pageSize }))
  }

  const handlePreviousPage = () => {
    dispatch(getOrganizationSchools({ organizationId: org.organizationUniqueId, page: currentPage - 1, pageSize }))
  }

  const handleUserNextPage = () => {
    dispatch(getOrganizationUsersByRole({ organizationId: org.organizationId, roleName, page: userCurrentPage + 1, userPageSize }))
  }

  const handleUserPreviousPage = () => {
    dispatch(getOrganizationUsersByRole({ organizationId: org.organizationId, roleName, page: userCurrentPage - 1, userPageSize }))
  }

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Number.isNaN(pageSize)) {
      setPageSize(defaultSize)
    }
    const newSize = parseInt(event.target.value);
    setPageSize(newSize);
  };

  const handleUserPageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Number.isNaN(pageSize)) {
      setUserPageSize(defaultSize)
    }
    const newSize = parseInt(event.target.value);
    setUserPageSize(newSize);
  };

  const getZones = async (organizationId: string) => {
    store.dispatch(resetAllOrgZones());
    try {
      await dispatch(getOrganizationZones(organizationId));
      setIsModalOpen(true)
    } catch (error) {
      console.error('Error fetching organization zones:', error);
    }
  };

  const addZone = async (id: string) => {
    store.dispatch(resetAllOrgZones());
    try {
      setAddZoneModalOpen(true);
    } catch (error) {
      
    }
  };
  const addSchool = async (id: string) => {
    store.dispatch(resetAllOrgZones());
    try {
      setAddZoneModalOpen(true);
    } catch (error) {
      
    }
  };
  const userDetails = (uniqueId: string, roleName: string) => {
    store.dispatch(clearUserWithRoles());
    const userData: UserDetails = {
      uniqueId, roleName
    }
    dispatch(getUserDetails(userData))
      .then((result) => {
        // const payload = result.payload;
        if (userRoleStatus === "success") {
          setUserModalOpen(true)
        }
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  }

  const schoolDetails = (schoolId: string) => {
    store.dispatch(resetOrganizationSchool())
    navigate(`/school-home-page/${schoolId}`);
  }

  return (
    <>
      <div>
        <h2>Organization Details</h2>
        <p>Name: {org.name}</p>
        <p>Unique ID: {org.organizationUniqueId}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
        <button className='btn btn-info' onClick={() => getZones(org.organizationId)}>List Zones</button> | 
        <button className='btn btn-info' onClick={() => addZone(org.organizationUniqueId)}>Add Zone</button> |
        <button className='btn btn-info' onClick={() => addSchool(org.organizationUniqueId)}>Add School</button> |
        <Link className='btn btn-info' to="">Search School</Link> | 
        {/* in schools modal, buttons to show schools by zone (select tag to choose zone), show all schools (for the organization), add new school */}
      </div>
      <hr />
      <hr />

      <div className="row">
        <div className="col">
          <div>
            <h3>List of schools in {org.name}</h3>
            <div>
              <label htmlFor="pageSize">How many schools to be displayed at once: </label>
              <input className='form-control' type="number" id="pageSize" value={pageSize} onChange={handlePageSizeChange} />
              {/* Display your schools here */}
              {status === "pending" && <p><i>fetching list of schools ...</i></p>}
              {pageSchools.schools?.map((school, index) => (
                <div key={index}>
                  <ol start={index + 1}>
                      <li>
                        <div onClick={() => schoolDetails(school.schoolId)} style={{ cursor: "pointer"}}>
                          <strong>School Name:</strong> {school.name}<br />
                          <strong>School ID:</strong> {school.schoolUniqueId}<br />
                          <small><strong>School Address:</strong> {school.address}</small>
                        </div>
                      </li>
                    </ol>
                </div>
              ))}

              {pageSchools.schools.length !== 0 && 
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                  <button className='btn btn-info' onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                  <button className='btn btn-info' onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="col">
          {/* get organization users by roles */}
          {/* first display all users by teaching staff role, then display by specified role */}
          <div>
            <h3>{org.name} users by their roles</h3>
            <div>
              <label htmlFor="userPageSize">How many users to be displayed at once: </label>
              <input className='form-control' type="number" id="userPageSize" value={userPageSize} onChange={handleUserPageSizeChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="roleName" className="form-label">
                Select User Role
              </label>
              <select
                className="form-select"
                id="roleName"
                name="roleName"
                value={roleName}
                required
                onChange={(e) => {
                  setRoleName(e.target.value);
                }}
              >
                <option value="" disabled>Choose A Role</option>
                <option value="TeachingStaff">Teaching Staff</option>
                <option value="NonTeachingStaff">Non Teaching Staff</option>
                <option value="Admin">School Admin</option>
                <option value="Parent">Parent</option>
                <option value="Student">Student</option>
              </select>
            </div>

            {/* display users by role */}
            {userStatus === "pending" && <p><i>fetching users by {roleName} role. Please wait ...</i></p>}
            {pageUsers.users?.map((user, index) => (
              <div key={index}>
                <ol start={index+1}>
                  <li>
                    <div onClick={() => userDetails(user.uniqueId, roleName)} style={{ cursor: "pointer"}}>
                      <strong>Name: </strong>{user.firstName} {user.lastName}<br />
                      <strong>User ID: </strong>{user.uniqueId}<br />
                      <strong>Phone Number: </strong>{user.phoneNumber}<br />
                      <strong>Email Address: </strong>{user.email}<br />
                    </div>
                  </li>
                </ol>
              </div>
            ))}

            {pageUsers.users.length !== 0 && 
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                  <button className='btn btn-info' onClick={handleUserPreviousPage} disabled={userCurrentPage === 1}>Previous</button>
                  <button className='btn btn-info' onClick={handleUserNextPage} disabled={userCurrentPage === userTotalPages}>Next</button>
                </div>
              }
          </div>
        </div>
      </div>

      {/* Bootstrap Modal for getZones */}
      {isModalOpen && (
        <GetZonesModal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        allZones={orgZones as Zone[]}
        zoneMsg={orgZonesMsg}
        org={org}
      />
      )}

      {/* Bootstrap Modal for addZones */}
      {addZoneModalOpen && (
        <AddZoneModal 
          isModalOpen={addZoneModalOpen}
          closeModal={() => setAddZoneModalOpen(false)}
          org={org}
        />
      )}

      {userModalOpen && (
        <UserModal 
          isModalOpen={userModalOpen}
          closeModal={() => setUserModalOpen(false)}
          user={userWithRoles}
          roleName={roleName}
        />
      )}
    </>
  );
}

export default OrganizationDetails