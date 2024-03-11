import React, { useState } from "react";
import { IoReorderFourOutline } from "react-icons/io5";
import { menu } from "./SidebarConfig";
import { useNavigate } from "react-router-dom";
import CreatePostModal from "../Post/CreatePostModal";
import { useDisclosure } from "@chakra-ui/react";
import SearchComponents from "../SearchComponents/SearchComponents";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSearchVisible, setIisSearchVisible] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const { user } = useSelector((store) => store);
  const navigate = useNavigate();

  const handleTabClick = (title) => {
    setActiveTab(title);
    if (title === "Profile") {
      navigate(`/${user.reqUser?.username}`);
    } else if (title === "Home") {
      navigate("/");
    } else if (title === "Create") {
      onOpen();
    }

    if (title === "Search") {
      setIisSearchVisible(true);
    } else {
      setIisSearchVisible(false);
    }
  };

  function handleClick() {
    setShowDropdown(!showDropdown);
  }
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="sticky top-0 h-[100vh] pb-10 flex">
      <div
        className={`flex flex-col justify-between h-full ${
          activeTab === "Search" ? "px-2" : "px-10"
        }`}
      >
        <div className="pt-10">
          {activeTab !== "Search" && (
            <img
              onClick={() => navigate("/")}
              className="w-40 cursor-pointer"
              src="https://i.imgur.com/zqpwkLQ.png"
              alt=""
            />
          )}

          <div className="mt-10">
            {menu.map((item) => (
              <div
                key={item.title}
                className="flex items-center mb-5 cursor-pointer text-lg"
                onClick={() => handleTabClick(item.title)}
              >
                <div>
                  {activeTab === item.title ? item.activeIcon : item.icon}
                </div>

                {activeTab !== "Search" && (
                  <p
                    className={`${
                      activeTab === item.title ? "font-bold" : "font-semibold"
                    }`}
                  >
                    {item.title}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div
            onClick={handleClick}
            className="flex items-center cursor-pointer"
          >
            <IoReorderFourOutline className="text-2xl" />
            {activeTab !== "Search" && <p className="ml-5">More</p>}
          </div>

          <div className="absolute bottom-20 left-14  w-[70%]">
            {showDropdown && (
              <div className="shadow-md">
                <p className=" w-full py-2 text-base px-4 border-t border-b  cursor-pointer">
                  Switch Appearance
                </p>
                <p className=" w-full py-2 text-base px-4 border-t border-b cursor-pointer">
                  Saved
                </p>
                <p
                  onClick={handleLogout}
                  className=" w-full py-2 text-base px-4 border-t border-b cursor-pointer"
                >
                  Log out
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Box */}
      {isSearchVisible && <SearchComponents />}

      {/* Create Post Modal */}
      <CreatePostModal onClose={onClose} isOpen={isOpen} />
    </div>
  );
};

export default Sidebar;
