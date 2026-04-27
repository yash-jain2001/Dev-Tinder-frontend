import React from 'react'

const EditProfileUserCard = ({user}) => {
  const {firstName,lastName,profilePicture,skills,age,gender,about} = user
  return (
    <div className="hover-3d  h-[500px] w-80">
  {/* content */}
  <div className="card bg-base-300 w-full h-full shadow-sm hover:shadow-gray-500/20 hover:shadow-lg duration-300">
  <figure className='h-[50%] w-full'>
    <img
      src={profilePicture}
      alt="user" 
      className='w-full h-full object-cover'
      />
  </figure>
  <div className="card-body flex items-center">
    <h2 className="card-title">{firstName + " " +lastName}</h2>
    {(age&&gender)&&<div className="badge badge-primary badge-sm">{gender.toUpperCase()}, {age}</div>}
    <div className='flex flex-wrap gap-1 justify-center'>
        {skills.map((skill)=>(
        <div className="badge badge-soft badge-primary">{skill.toString().toUpperCase()}</div>
    ))}
    </div>
    <p>{about}</p>
  </div>
</div>




  {/* 8 empty divs needed for the 3D effect */}
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
  )
}

export default EditProfileUserCard