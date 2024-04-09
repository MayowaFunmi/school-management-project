import React from 'react'
import { OrganizationZonesModalProps } from '../models/userModel';
import './modals.css';

const GetZonesModal: React.FC<OrganizationZonesModalProps> = ({ isModalOpen, closeModal, allZones, zoneMsg, org }) => {

  const formatDate = (time: string) => {
    return new Intl.DateTimeFormat('en-US').format(new Date(time));
  };
  
  return (
    <>
      <div className={`modal ${isModalOpen ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: isModalOpen ? 'block' : 'none' }}>
          <div className="modal-dialog custom-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Organization Zones For {org.name}</h5>
                <button type="button" className="close" onClick={closeModal} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                
                {(allZones?.length !== 0  || zoneMsg === "success") && (
                  <>
                    <p>{allZones?.length} {allZones?.length === 1 ? 'zone' : 'zones'}:</p>
                    <hr />
                    {allZones?.map((zone) => (
                        <div key={zone.zoneId}>
                          <h3><strong> Zone Name: {zone.name}</strong></h3>
                          <p>Schools: </p>
                          {zone.schools.length > 0 ? (
                            <>
                              {zone.schools?.map((school, index) => (
                                <div key={school.schoolId}>
                                  <ol start={index + 1}>
                                    <li>
                                      <div>
                                        <strong>School Name:</strong> {school.name}<br />
                                        <small><strong>School Address:</strong> {school.address}</small><br />
                                        <strong>School ID:</strong> {school.schoolUniqueId}<br />
                                      </div>
                                    </li>
                                  </ol>
                                </div>
                              ))}
                            </>
                          ) : (
                            <p>No School Found</p>
                          )}
                          <p>Time Added: {formatDate(zone.createdAt.toString())}</p>
                          <hr />
                          <hr />
                        </div>
                    ))}
                  </>
                )}
                
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default GetZonesModal