import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { Link, Links, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [currentTab, setCurrentTab] = useState("/connections");

  const user = useSelector((store) => store.user);
  // console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        },
      );
      // console.log(res.data);
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm justify-between">
      <div className="flex">
        <Link to="/" className="text-xl cursor-pointer ml-4">
          Dev Tinder 🧑‍💻
        </Link>
      </div>


      <div className="flex gap-10 mr-8">
      <div className="indicator">
        {/* <span className="indicator-item badge badge-secondary">{}</span> */}
        <Link to="/requests" className="btn">Requests</Link>
      </div>
        {user && (
          <div className="dropdown dropdown-end">
            <div className="flex items-center">
              <h4 className="text-md mr-4">
                Welcome {user.firstName + " " + user.lastName} 👋
              </h4>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.profilePicture}
                  />
                </div>
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm bg-base-300 dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
                <Link to="/connections" className="justify-between">
                  My Connections
                </Link>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
