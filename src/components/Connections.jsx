import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/myconnections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  if (!connections) return null;

  if (connections?.length === 0) {
    return (
      <div className="text-2xl font-bold text-center ml-4 mt-4">
        No connections found{" "}
      </div>
    );
  }

  return (
    <>
      <div className="text-2xl font-bold text-center ml-4 mt-4 mb-10">
        My Connections
      </div>

      <div className="px-10">
        {connections.map((connection) => {
            const {firstName, lastName, gender, age, email, skills, about, profilePicture} = connection;
        return (
          <div className="card border border-gray-400 card-side bg-base-300 shadow-sm w-1/3 h-[300PX]">
            <figure className="w-[50%] h-full bg-red-400">
              <img
              className="h-full w-full object-cover"
                src={profilePicture}
                alt="Movie"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{firstName + " " + lastName}</h2>
              <p className="text-stone-400">{gender?.toUpperCase()}, {age}</p>
              <a href={`mailto:${email}`} className="underline">{email}</a>
              <div className="flex gap-1 flex-wrap">
                {skills.map((skill)=>{
                return <div className="badge badge-primary badge-lg">{skill}</div>
              })}
              </div>
              <p className="text-sm text-gray-400 text-clip line-clamp-3 underline">{about}</p>
              <div className="card-actions justify-end mt-10">
                <button className="btn btn-primary">Message</button>
              </div>
            </div>
          </div>
        );
      })}
      </div>
    </>
  );
};

export default Connections;
