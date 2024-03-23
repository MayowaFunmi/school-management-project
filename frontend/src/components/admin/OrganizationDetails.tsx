import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getOrganizationZones } from '../../features/adminSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import GetZonesModal from '../../modals/GetZonesModal';
import { Organization, Zone } from '../../models/userModel';
import AddZoneModal from '../../modals/AddZoneModal';
import store from '../../store/store';

const OrganizationDetails = () => {
  const location = useLocation();
  const org = location.state.org;
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false)

  const { zoneMsg } = useAppSelector((state) => state.admin);
  const { allZones } = useAppSelector((state) => state.zone);

  const getZones = async (id: string) => {
    //store.dispatch(resetAllZones());
    try {
      await dispatch(getOrganizationZones(id));
      setIsModalOpen(true)
    } catch (error) {
      console.error('Error fetching organization zones:', error);
    }
  };

  const addZone = async (id: string) => {
    //store.dispatch(resetAllZones());
    try {
      setIsModalOpen(true);
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
        <button className='btn btn-info'>Schools</button> | 
        {/* in schools modal, buttons to show schools by zone (select tag to choose zone), show all schools (for the organization), add new school */}
      </div>

      {/* Bootstrap Modal for getZones */}
      {isModalOpen && (
        <GetZonesModal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        allZones={allZones as Zone[]}
        zoneMsg={zoneMsg}
        org={org as Organization}
      />
      )}

      {/* Bootstrap Modal for addZones */}
      {/* {isModalOpen && (
        <AddZoneModal 
          isModalOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          org={org as Organization}
        />
      )} */}
    </>
  );
}

export default OrganizationDetails