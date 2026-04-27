import React from "react";
import { useState } from "react";
import EditProfileUserCard from "./EditProfileUserCard";
import axios from "axios";
import { BASE_URL } from "./../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  console.log(user);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [skills, setSkills] = useState(user.skills);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);
  const [about, setAbout] = useState(user.about);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    //clear error
    setError("");

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, profilePicture, skills, age, gender, about },
        {
          withCredentials: true,
        },
      );
      console.log(res.data.data);
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="flex items-center justify-around  py-10 gap-3 w-full h-full">
      <div className=" border border-gray-200 rounded-lg">
        <fieldset className="fieldset flex flex-col gap-3 bg-base-300 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend font-bold text-xl">
            Edit Profile
          </legend>

          <label className="floating-label">
            <span>First Name</span>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input input-md"
            />
          </label>

          <label className="floating-label">
            <span>Last Name</span>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input input-md"
            />
          </label>

          <label className="input">
            <span className="label">https://</span>
            <input
              type="text"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
              className="input"
              placeholder="Profile Picture URL"
            />
          </label>

          <label className="floating-label">
            <span>Age</span>
            <input
              type="number"
              placeholder="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input input-md"
            />
          </label>

          {/* <label className="floating-label">
            <span>Gender</span>
            <input
              type="text"
              placeholder="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="input input-md"
            />
          </label> */}

          <div className="flex gap-3">
            <input
              type="radio"
              name="radio-1"
              className="radio"
              value={gender}
              checked={gender === "male"}
              onChange={(e) => setGender("male")}
            />
            Male
            <input
              type="radio"
              name="radio-1"
              className="radio"
              value={gender}
              checked={gender === "female"}
              onChange={(e) => setGender("female")}
            />
            Female
          </div>

          <label className="floating-label">
            <span>About</span>
            <input
              type="text"
              placeholder="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="input input-md"
            />
          </label>

          <label className="floating-label">
            <span>Skills (comma separated)</span>
            <input
              type="text"
              placeholder="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value.split(","))}
              className="input input-md"
            />
          </label>

          <button onClick={saveProfile} className="btn btn-neutral mt-4 w-full">
            Update Profile
          </button>
        </fieldset>
      </div>

      {user && (
        <EditProfileUserCard
          user={{
            firstName,
            lastName,
            profilePicture,
            skills,
            age,
            gender,
            about,
          }}
        />
      )}
      {showToast && (
        <div className="toast toast-top toast-end top-20">
          <div className="alert alert-success">
            <span>Profile Updated successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
