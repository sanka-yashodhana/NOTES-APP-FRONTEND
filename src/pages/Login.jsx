import React, { useState } from "react";
import isEmail from 'validator/lib/isEmail'
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import axiosInstance from "../utils/axiosInstance";

const Login =  () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e)=>{
    e.preventDefault();

    if(!isEmail(email)){
      setError("Please Enter a Valid email address")
      return;
    }

    if(!password){
      setError("Please Enter the Password")
      return
    }

    setError("")
    setLoading(true);

    //Login API Call
  try {
    const response = await axiosInstance.post("/login", {
      email: email,
      password: password
    });

    console.log("API Response:", response.data);

    if(response.data && response.data.accessToken){
      localStorage.setItem("token", response.data.accessToken);
      navigate("/dashboard");
    }
  } catch (error) {
    if(error.response && error.response.data && error.response.data.message){
      setError(error.response.data.message)
    } else{
      setError("An unexpected error occurred. please try again later.")
    }
  } finally{
    setLoading(false);
  }
  }

  

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="flex items-center justify-center mt-20 px-4">
        <div className="w-full max-w-md border rounded-2xl bg-white px-8 py-12 shadow-sm">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl font-semibold mb-8 text-slate-800">Login</h4>

            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Email Address</label>
                <input
                  type="text"
                  placeholder="name@example.com"
                  className="input-box"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Password</label>
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-xs mt-3 ml-1 animate-shake">{error}</p>}

            <button type="submit" className="btn-primary w-full mt-8 py-3 rounded-xl font-semibold shadow-md shadow-blue-100 hover:shadow-lg transition-all" disabled={loading}>
              {loading ? "Logging in..." : "LOGIN"}
            </button>

            <p className="text-sm text-center mt-6 text-slate-500">
              Not registered yet?{" "}
              <Link to="/signup" className="font-bold text-primary hover:underline transition-all">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
