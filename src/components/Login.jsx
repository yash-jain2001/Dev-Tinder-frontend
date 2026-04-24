import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("viratkohli@gmail.com");
  const [password, setPassword] = useState("Virat@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true, // it is necessary to pass withCredentials to true in making api call
        },
      );
      console.log(res.data);
      navigate("/");
      dispatch(addUser(res.data));
    } catch (err) {
      setError(err.response.data);
      console.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-full translate-y-[40%]">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend font-bold text-xl">Login</legend>

        <label className="label text-base">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          placeholder="Email"
        />

        <label className="label text-base">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          placeholder="Password"
        />

        <p className="text-red-500 mt-2 ml-1">{error ? "ERROR: "+error : null}</p>
        <button onClick={handleLogin} className="btn btn-neutral mt-4">
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
