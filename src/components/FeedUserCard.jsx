import React from 'react'

const FeedUserCard = ({user}) => {
    // console.log(user);
    const {firstName,lastName,profilePicture,skills,age,gender,about} = user
    
  return (
    <div className="card bg-base-300 w-80 h-[450px]  shadow-sm hover:shadow-gray-500/20 hover:shadow-lg duration-300">
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
    <div className="card-actions justify-between mt-5 w-full">
      <button className="btn btn-info w-1/3">Interested</button>
      <button className="btn btn-error w-1/3">Skip</button>
    </div>
  </div>
</div>
  )
}

export default FeedUserCard