import React, { useEffect } from "react";
import ProfileUserDetails from "./../../Components/ProfileComponents/ProfileUserDetails";
import ReqUserPostPart from "./../../Components/ProfileComponents/ReqUserPostPart";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { isReqUser } from "../../Config/Logics";
import { isFollowing } from "./../../Config/Logics";
import {
  findUserByUserNameAction,
  getUserProfileAction,
} from "../../Redux/User/Action";

const Profile = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);
  const { username } = useParams();

  const isRequser = isReqUser(user.reqUser?.id, user.findByUsername?.id);
  const isFollowed = isFollowing(user.reqUser, user.findByUsername);

  useEffect(() => {
    const data = {
      jwt: token,
      username,
    };

    dispatch(getUserProfileAction(data.jwt));
    dispatch(findUserByUserNameAction(data));
  }, [username]);

  return (
    <div className="px-20">
      {
        <>
          <div>
            <ProfileUserDetails
              user={isRequser ? user.reqUser : user.findByUsername}
              isFollowing={isFollowed}
              isRequser={isRequser}
            />
          </div>
          <div>
            <ReqUserPostPart
              user={isRequser ? user.reqUser : user.findByUsername}
            />
          </div>
        </>
      }
    </div>
  );
};

export default Profile;
