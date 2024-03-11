import React from "react";
import { useNavigate } from "react-router-dom";

const StoryCircle = ({ user }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/story/${user.id}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="cursor-pointer flex flex-col items-center"
    >
      <img
        className="w-16 h-16 rounded-full"
        src={
          user?.image ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        }
        alt=""
      />
      <p>
        {user?.username?.length > 9
          ? user?.username.substring(0, 9) + "..."
          : user?.username}
      </p>
    </div>
  );
};

export default StoryCircle;
