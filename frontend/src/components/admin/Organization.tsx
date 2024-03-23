import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector'
import { useAuth } from '../../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createOrganization, getAdminOrganizations, getOrganizationZones } from '../../features/adminSlice';
import { OrgData as UserOrganization } from '../../models/userModel';

const Organization = () => {

  const { orgMsg, orgStatus, organizations } = useAppSelector((state) => state.admin);
  const { isAuthenticated, isAdminRoleExists, userId } = useAuth();
  const dispatch = useAppDispatch();

  const [organizationName, setOrganizationName] = useState("")
  const [orgUniqueId, setOrgUniqueId] = useState("")
  const [organizationDetails, setOrganizationDetails] = useState<UserOrganization | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const notifyError = (msg: string) => toast.error(msg);
  const notifySuccess = (msg: string) => toast.success(msg);
  const navigate = useNavigate();

  useEffect(() => {
    if (orgStatus === "success") {
      notifySuccess(orgMsg)
    } else if (orgStatus === "rejected") {
      notifyError(orgMsg)
    }
    dispatch(getAdminOrganizations(userId));
  }, [dispatch, orgMsg, orgStatus, userId])

  if (!isAuthenticated && !isAdminRoleExists) {
    return <Navigate to='/' />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!organizationName) {
      notifyError("Organization name cannot be empty");
      return;
    }
    await dispatch(createOrganization(organizationName))
  }

  const getZones = async (id: string) => {
    try {
      await dispatch(getOrganizationZones(id));
    } catch (error) {
      console.error('Error fetching organization zones:', error);
    }
  };

  const addZone = (id: string) => {
    setOrgUniqueId(id);
  }

  const formatDate = (time: string) => {
    return new Intl.DateTimeFormat('en-US').format(new Date(time));
  };

  const handleViewDetails  = (org: UserOrganization) => {
    //store.dispatch(resetAllZones());
    navigate(`/organization-details/${org.organizationId}`, { state: { org } });
  };

  const closeModal = () => {
    setOrganizationDetails(null);
    setIsModalOpen(false);
    setOrgUniqueId("");
  };

  return (
    <React.Fragment>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingOrganizationName" 
              name='organizationName'
              value={organizationName}
              onChange={(e) => {
                setOrganizationName(e.target.value);
              }}
            />
            <label htmlFor="floatingOrganizationName">Name Of Organization</label>
          </div>

          <div className="col-12">
            {(orgStatus === "" || orgStatus === "rejected") && <button type='submit' className="btn btn-primary">Create Organization</button>}
            {orgStatus === "pending" && <button type='submit' className="btn btn-primary" disabled>Please wait ...</button>}
            {orgStatus === "success" && null}
          </div>
        </form>
      </div>
      <hr />
      <h3>Your Organizations</h3>

      {organizations !== null ? (
        <>
          {organizations?.map((data) => (
            <div key={data.organizationId}>
              <p><strong>Organization Name: {data.name}</strong></p>
              <p>User Unique Id: {data.admin.uniqueId}</p>
              <p>First Name: {data.admin.firstName}</p>
              <p>Last Name: {data.admin.lastName}</p>
              <p>Email: {data.admin.email}</p>
              <p>Username: {data.admin.userName}</p>
              <p>Organization Unique Id: {data.organizationUniqueId}</p>
              <div>
                <button className='btn btn-info' onClick={() => handleViewDetails(data)}>
                  View Details
                </button>
              </div>
              <hr />
            </div>
          ))}
        </>
      ) : (
        <div>
          <p>No organization list available</p>
        </div>
      )}

    </React.Fragment>
  )
}

export default Organization