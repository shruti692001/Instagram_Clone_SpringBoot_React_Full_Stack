import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import Profile from "../Profile/Profile";
import Story from "../Story/Story";
import Auth from "../Auth/Auth";
import EditAccountDetails from "../../Components/EditAccount/EditAccountDetails";
import EditProfilePage from "./../EditProfile/EditProfilePage";

const Router = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <div className="flex">
          <div className="w-[20%] border border-1-slate-500 pl-10">
            <Sidebar />
          </div>
          <div className="w-[80%] ">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/:username" element={<Profile />} />
              <Route path="/story/:userId" element={<Story />} />
              <Route path="/comment/:postId" element={<HomePage />} />
              <Route path="/account/edit" element={<EditProfilePage />} />
            </Routes>
          </div>
        </div>
      )}

      {(location.pathname === "/login" || location.pathname === "/signup") && (
        <div>
          <Routes>
            <Route path="/signup" element={<Auth />} />
            <Route path="/login" element={<Auth />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default Router;
