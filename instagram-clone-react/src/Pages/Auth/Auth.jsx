import React from "react";
import "./Auth.css";
import Signin from "../../Components/Register/Signin";
import { useLocation } from "react-router-dom";
import Signup from "./../../Components/Register/Signup";

const Auth = () => {
  const location = useLocation();
  return (
    <div>
      <div className="flex items-center justify-center h-[100vh]">
        <div className="relative mr-10 hidden lg:block">
          <div className=" h-[35.3rem] w-[23rem]">
            <img
              className="h-full w-full"
              src="https://res.cloudinary.com/dnbw04gbs/image/upload/v1679494375/home-phones-2x-edited_glksxn.png"
              alt="Instagram Homepage"
            />
            <div className="mobileWallpaper rounded-3xl absolute top-6 h-[33rem] w-[15.7rem] w- right-3"></div>
          </div>
        </div>

        <div className="form md:w-[35vw] lg:w-[22vw]">
          {location.pathname === "/login" ? <Signin /> : <Signup />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
