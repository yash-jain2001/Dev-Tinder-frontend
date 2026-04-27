import React from 'react'

const UserCard = ({user}) => {
    // console.log(user);
    const {firstName,lastName,profilePic,skills,age,gender} = user
    
  return (
    <div className="card bg-base-300 w-96 shadow-sm hover:shadow-gray-500/20 hover:shadow-lg duration-300">
  <figure>
    <img
      src="https://tse4.mm.bing.net/th/id/OIP.kBZT2T0iZjUvImLvIsID7wHaEc?pid=Api&P=0&h=180"
    //   src={profilePic}
      alt="user" 
      className='w-full object-contain'
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
    <div className="card-actions justify-between mt-5 w-full">
      <button className="btn btn-info w-1/3">Interested</button>
      <button className="btn btn-error w-1/3">Skip</button>
    </div>
  </div>
</div>
  )
}

export default UserCard