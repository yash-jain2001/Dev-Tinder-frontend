import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

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
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err.response.data);
      console.error(err.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      console.log(err.message);
      setError(err.response.data);
    }
  };

  return (
    <div className="flex justify-center h-screen">
      <fieldset className="fieldset bg-base-200 border-base-00 rounded-box w-xs h-fit border p-4">
        <legend className="fieldset-legend font-bold text-xl">
          {isLoginForm ? "Login" : "Sign Up"}
        </legend>

        {!isLoginForm && (
          <>
            <label className="label text-base">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input"
              placeholder="Jhon"
            />
            <label className="label text-base">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input"
              placeholder="Doe"
            />
          </>
        )}

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

        <p className="text-red-500 mt-2 ml-1">
          {error ? "ERROR: " + error : null}
        </p>
        <button
          onClick={isLoginForm ? handleLogin : handleSignUp}
          className="btn btn-neutral mt-4"
        >
          {isLoginForm ? "Login" : "Sign Up"}
        </button>

        <p
          className="text-center mt-2 cursor-pointer"
          onClick={() => setIsLoginForm(!isLoginForm)}
        >
          {isLoginForm
            ? "Don't have an account? Create account"
            : "Already have an account?"}
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
