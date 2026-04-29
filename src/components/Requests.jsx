import React, { useEffect } from "react";
import axios, { Axios } from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);


const reviewRequest = async(status,_id)=>{
  try {
    const res = await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true})
    console.log(res.data);
    dispatch(removeRequest(_id))
  } catch (error) {
    console.log(error.message);
  }
}

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });
      // console.log(res.data.data);
      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0)
    return (
      <div className="text-2xl font-bold text-center ml-4 mt-4">
        No Requests found
      </div>
    );

  return (
    <>
      <div className="text-2xl font-bold text-center ml-4 mt-4 mb-10">
        My Requests
      </div>

      <div className="px-10">
        {requests.map((request) => {
          const {
            firstName,
            lastName,
            email,
            profilePicture,
          } = request.fromUserId;
          return (
            <div className=" rounded pr-5 shadow-sm bg-base-300 flex justify-between items-center w-1/3">
              <div className="avatar">
                <div className="w-16 rounded">
                  <img src={profilePicture} />
                </div>
              </div>

              <span className="text-rotate">
                <span>
                  <span>{(firstName + " " + lastName).toUpperCase()}</span>
                  <span>{email}</span>
                </span>
              </span>

              <div className=" flex gap-4">
                <button onClick={()=>reviewRequest("accepted",request._id)} className="btn btn-info">Accept</button>
                <button onClick={()=>reviewRequest("rejected",request._id)} className="btn btn-error">Reject</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Requests;
