import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import GetZonesModal from '../../modals/GetZonesModal';
import { OrgData, Zone } from '../../models/userModel';
import AddZoneModal from '../../modals/AddZoneModal';
import store from '../../store/store';
import { getOrganizationZones, resetAllOrgZones } from '../../features/zoneSlice';
import { getOrganizationSchools } from '../../features/schoolSlice';

const OrganizationDetails = () => {
  const location = useLocation();
  const org: OrgData = location.state.org;
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [addZoneModalOpen, setAddZoneModalOpen] = useState(false)
  const defaultSize = 2;
  const [pageSize, setPageSize] = useState(defaultSize);

  const { orgZones, orgZonesMsg } = useAppSelector((state) => state.zone)
  const { pageSchools, status, currentPage, totalPages } = useAppSelector((state) => state.school);

  useEffect(() => {
    dispatch(getOrganizationSchools({ organizationId: org.organizationUniqueId, page: 1, pageSize }))
  }, [dispatch, org.organizationUniqueId, pageSize])

  const handleNextPage = () => {
    dispatch(getOrganizationSchools({ organizationId: org.organizationUniqueId, page: currentPage + 1, pageSize }))
  }

  const handlePreviousPage = () => {
    dispatch(getOrganizationSchools({ organizationId: org.organizationUniqueId, page: currentPage - 1, pageSize }))
  }

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Number.isNaN(pageSize)) {
      setPageSize(defaultSize)
    }
    const newSize = parseInt(event.target.value);
    setPageSize(newSize);
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

  return (
    <>
      <div>
        <h2>Organization Details</h2>
        <p>Name: {org.name}</p>
        <p>Unique ID: {org.organizationUniqueId}</p>
      </div>
      <div>
        <button className='btn btn-info' onClick={() => getZones(org.organizationId)}>List Zones</button> | 
        <button className='btn btn-info' onClick={() => addZone(org.organizationUniqueId)}>Add Zone</button> |
        <Link className='btn btn-info' to="">Search School</Link> | 
        {/* in schools modal, buttons to show schools by zone (select tag to choose zone), show all schools (for the organization), add new school */}
      </div>
      <div>
        <h3>List of schools in {org.name}</h3>
        <div>
          <label htmlFor="pageSize">Page Size: </label>
          <input className='form-control' type="number" id="pageSize" value={pageSize} onChange={handlePageSizeChange} />
          {/* Display your schools here */}
          {status === "pending" && <p><i>fetching list of schools ...</i></p>}
          {pageSchools.schools?.map((school, index) => (
            <div key={index}>
              <ol start={index + 1}>
                  <li>
                    <div>
                      <strong>School Name:</strong> {school.name}<br />
                      <strong>School ID:</strong> {school.schoolUniqueId}<br />
                      <small><strong>School Address:</strong> {school.address}</small>
                    </div>
                  </li>
                </ol>
            </div>
          ))}
          <button className='btn btn-info' onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
          <button className='btn btn-info' onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
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
    </>
  );
}

export default OrganizationDetails