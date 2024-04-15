import React from 'react'

const ProfileImage: React.FC<{ imageUrl: string; size: string, borderRadius: string, classVal: string | ""}> = ({ imageUrl, size, borderRadius, classVal }) => {
  const containerStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: borderRadius,
    overflow: 'hidden'
  }

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
  return (
    <div style={containerStyle}>
      <img src={imageUrl} alt="Profile pic" style={imageStyle} className={classVal} />
    </div>
  )
}

export default ProfileImage