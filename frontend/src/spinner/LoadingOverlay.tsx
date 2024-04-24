import React from 'react'
import './LoadingOverlay.css';

interface LoadingProps {
  loading: string
}

const LoadingOverlay: React.FC<LoadingProps> = ({ loading }) => {
  return loading === "pending" ? (
    <div className='loading-overlayZ'>
      <div className='spinner'></div>
    </div>
  ) : null;
}

export default LoadingOverlay