import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createZone } from '../../features/adminSlice';
import { statesData } from '../../utils/statesData';
import { ZoneValues } from '../../models/userModel';

interface ZoneProps {
  organizationUniqueId: string
}

const Zones: React.FC<ZoneProps> = ({ organizationUniqueId }) => {

  const { zoneStatus, zoneMsg } = useAppSelector((state) => state.admin);
  const { isAuthenticated, isOrganizationAdminExists, userId } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("")
  const [state, setState] = useState<string>("");
  const [lgas, setLgas] = useState<string[]>([]);
  const [localGovtAreas, setLocalGovtAreas] = useState<string[]>([]);

  const notifyError = (msg: string) => toast.error(msg);
  const notifySuccess = (msg: string) => toast.success(msg);

  useEffect(() => {
    if (!isAuthenticated && !isOrganizationAdminExists) {
      navigate('/')
    }
  }, [isAuthenticated, isOrganizationAdminExists, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const adminId = userId
    const zoneValues: ZoneValues = { adminId, organizationUniqueId, name, state, localGovtAreas};
    if (!name || !organizationUniqueId || !state || !localGovtAreas || !adminId) {
      notifyError("Some fields cannot be empty");
      return;
    }
    await dispatch(createZone(zoneValues));
    if (zoneStatus === "success") {
      notifySuccess(zoneMsg)
    }
    if (zoneStatus === "rejected") {
      notifyError(zoneMsg)
    }
  }

  const handleLgaSelection = (lga: string) => {
    setLocalGovtAreas((prevSelectedLgas) => {
      if (prevSelectedLgas.includes(lga)) {
        return prevSelectedLgas.filter((selectedLga) => selectedLga !== lga)
      } else {
        return [...prevSelectedLgas, lga]
      }
    })
  }

  return (
    <>
      <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
					<input
						type="text"
						className="form-control"
						id="name" 
						placeholder="Enter name of zone"
						name='userId'
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
					<label htmlFor="name">Name Of Zone</label>
				</div>

        <div className="mb-3">
          <label htmlFor="state" className="form-label">
            Select State
          </label>
          <select
            className="form-select"
            id="state"
            name="state"
            value={state}
            onChange={(e) => {
              const newState = e.target.value as string;
              setState(newState);
              setLgas(statesData.find(state => state.state === newState)?.lgas || []);
            }}
            required
          >
            <option value="" disabled>
            Select a state
          </option>
          {statesData.map((state) => (
            <option key={state.state} value={state.state}>
              {state.state}
            </option>
          ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="lga" className="form-label">
            Select LGA
          </label>
          {state && (
            <div>
              {lgas.map((lgaName) => (
                <div key={lgaName} className='form-check'>
                  <input
                    type="checknox"
                    className='form-check-input'
                    id={lgaName}
                    value={lgaName}
                    checked={localGovtAreas.includes(lgaName)}
                    onChange={(e) => handleLgaSelection(e.target.value)}
                  />
                  <label htmlFor={lgaName} className="form-check-label">
                    {lgaName}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

				<div className="col-12">
          {(zoneStatus === "pending" || zoneStatus === "rejected") && (
            <button type='submit' className="btn btn-primary">Create Zone</button>
          )}
          {zoneStatus === "success" && (
            <button type='submit' className="btn btn-primary" disabled>Zone Created!!</button>
          )}
				</div>
			</form>
      </div>
      <hr />
    </>
  )
}

export default Zones