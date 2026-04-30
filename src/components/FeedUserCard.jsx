import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { removeUserFromFeed } from '../utils/feedSlice'

const FeedUserCard = ({user}) => {

    const dispatch = useDispatch();
    // console.log(user);
    const {_id,firstName,lastName,profilePicture,skills,age,gender,about} = user

    const handleSendRequest = async(status, userId)=>{
     try {
       const res = await axios.post(BASE_URL+"/request/send/"+ status + "/" + userId,{},{withCredentials:true})
      dispatch(removeUserFromFeed(userId));
      console.log(res.data);
      
      } catch (error) {
      console.log(error.message);
     } 
    }
    
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
      <button onClick={()=>handleSendRequest("interested",_id)} className="btn btn-info w-1/3">Interested</button>
      <button onClick={()=>handleSendRequest("ignored",_id)} className="btn btn-error w-1/3">Skip</button>
    </div>
  </div>
</div>
  )
}

export default FeedUserCard