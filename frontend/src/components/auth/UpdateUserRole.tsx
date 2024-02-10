import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from "../../hooks/useTypedSelector";
import { addRoleToUser, getUserDetails, removeRoleFromUser } from '../../features/adminSlice';
import Spinner from '../../spinner/Spinner';
import { Users } from '../../models/userModel';

const UpdateUserRole: React.FC = () => {

  const { isAuthenticated, isSuperAdminRoleExists } = useAuth();
  const [uniqueId, setUniqueid] = useState('');
  const [userDetails, setUserDetails] = useState<Users | undefined>(undefined);
  const [userId, setUserId] = useState("");
  const [roleName, setRoleName] = useState("");
  const [userId2, setUserId2] = useState("");
  const [roleName2, setRoleName2] = useState("");

  const notifyError = (msg: string) => toast.error(msg);
  const notifySuccess = (msg: string) => toast.success(msg);

  const dispatch = useAppDispatch();
  const { loading, data, status, roleMsg } = useAppSelector((state) => state.admin);
  const { roles } = useAuth();

  useEffect(() => {
    if (!loading) {
      setUserDetails(data);
    }
    if (roleMsg) {
      notifySuccess(roleMsg)
    }
  }, [data, loading, roleMsg])

  if (!isAuthenticated && !isSuperAdminRoleExists) {
    return <Navigate to="/" />;
  }

  const handleGetUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uniqueId) {
      notifyError("Unique ID of user cannot be empty");
      return;
    }
    await dispatch(getUserDetails(uniqueId));
  };

  const handleUpdateUserRoles = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId && !roleName) {
      notifyError("invalid/empty form data")
    }
    const values = { uniqueId, roleName }
    await dispatch(addRoleToUser(values));
  };

  const handleDeleteUserRoles = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId2 && !roleName2) {
      notifyError("invalid/empty form data")
    }
    const values = { uniqueId, roleName2 }
    await dispatch(removeRoleFromUser(values));
  }

  return (
    <>
      <div className="container">
		    <Spinner loading={loading} />
        <form onSubmit={handleGetUser}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingUniqueId" 
              placeholder="Enter user's unique id"
              name='uniqueId'
              value={uniqueId}
              onChange={(e) => {
                setUniqueid(e.target.value);
              }}
            />
            <label htmlFor="floatingUniqueId">Unique ID</label>
          </div>

          <div className="col-12">
            {status === "" && <button type='submit' className="btn btn-primary">Get User Details</button>}
            {status === "pending" && <button type='submit' className="btn btn-primary" disabled>Please wait ...</button>}
            {(status === "success" || status === "rejected") && null}
          </div>
        </form>

        {/* user data */}
        <h2>User Details</h2>
        {userDetails ? (
          <>
            <p>Id: {userDetails.user.id}</p>
            <p>Unique Id: {userDetails.user.uniqueId}</p>
            <p>Username: {userDetails.user.userName}</p>
            <p>First Name: {userDetails.user.firstName}</p>
            <p>Last Name: {userDetails.user.lastName}</p>
            <p>Email: {userDetails.user.email}</p>
            <p>Phone Number: {userDetails.user.phoneNumber}</p>
            <p>Date Registered: {new Date(userDetails.user.createdAt).toLocaleString('en-US')}</p>
            <p>Roles:</p>
            <ul>
              {userDetails.userRoles.map((role, index) => (
                <li key={index}>{role.name}</li>
              ))}
            </ul>
          </>
        ) : null}

        {status === "success" && 
          <>
            <div className='row'>
              <div className='col'>
                <h3>Add Role To User</h3>
                <form onSubmit={handleUpdateUserRoles}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingUniqueId" 
                      placeholder="Enter user's unique id"
                      name='userId'
                      value={userId}
                      onChange={(e) => {
                        setUserId(e.target.value);
                      }}
                    />
                    <label htmlFor="floatingUniqueId">Unique ID</label>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="userRoles" className="form-label">
                      Select User Role
                    </label>
                    <select
                      className="form-select"
                      id="userRoles"
                      name="roleName"
                      value={roleName}
                      onChange={(e) => setRoleName(e.target.value)}
                    >
                      <option value="" disabled>
                        Select a role
                      </option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12">
                    <button type='submit' className="btn btn-primary">Add Roles To User</button>
                  </div>
                </form>
              </div>
              <div className='col'>
                <h3>Remove Role From User</h3>
                <form onSubmit={handleDeleteUserRoles}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingUniqueId1" 
                      placeholder="Enter user's unique id"
                      name='userId2'
                      value={userId2}
                      onChange={(e) => {
                        setUserId2(e.target.value);
                      }}
                    />
                    <label htmlFor="floatingUniqueId1">Unique ID</label>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="userRoles1" className="form-label">
                      Select User Role
                    </label>
                    <select
                      className="form-select"
                      id="userRoles1"
                      name="roleName2"
                      value={roleName2}
                      onChange={(e) => setRoleName2(e.target.value)}
                    >
                      <option value="" disabled>
                        Select a role
                      </option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12">
                    <button type='submit' className="btn btn-primary">Remove Role From User</button>
                  </div>
                </form>
              </div>
            </div>
          </>
        }
      </div>
    </>
  )
}

export default UpdateUserRole