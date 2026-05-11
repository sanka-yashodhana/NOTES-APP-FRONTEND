import React from "react";
import { getInitials } from "../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="md:w-12 md:h-12 md:flex md:items-center md:justify-center md:rounded-full md:text-slate-950 md:font-medium md:bg-slate-100 hidden">
        {getInitials(userInfo?.fullName)} 
      </div>

      <div>
        <p className="text-sm font-medium">{userInfo?.fullName}</p>
        <button className="text-sm text-slate-700 underline" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
