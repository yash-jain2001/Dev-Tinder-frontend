import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("viratkohli@gmail.com");
  const [password, setPassword] = useState("Virat@123");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/login", {
        email,
        password,
      },{
        withCredentials:true
      });
      console.log(res);
    } catch (err) {
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

        <button onClick={handleLogin} className="btn btn-neutral mt-4">
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
