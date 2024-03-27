import React from 'react'

const ProfileImage: React.FC<{ imageUrl: string; size: string}> = ({ imageUrl, size }) => {
  const containerStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    overflow: 'hidden'
  }

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
  return (
    <div style={containerStyle}>
      <img src={imageUrl} alt="Profile" style={imageStyle} />
    </div>
  )
}

export default ProfileImage