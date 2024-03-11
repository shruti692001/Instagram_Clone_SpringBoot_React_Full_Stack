import React, { useEffect } from "react";
import "./SearchComponents.css";
import SearchUserCard from "./SearchUserCard";
import { useDispatch, useSelector } from "react-redux";
import { searchUserAction } from "../../Redux/User/Action";

const SearchComponents = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);

  const handleSearch = (e) => {
    const data = { jwt: token, query: e.target.value };
    dispatch(searchUserAction(data));
  };

  return (
    <div className="search-container">
      <div className="px-3 pb-5">
        <h1 className="text-xl pb-5">Search</h1>

        <input
          onChange={handleSearch}
          className="search-input"
          type="text"
          placeholder="Search..."
        />
      </div>

      <hr />
      <div className="px-3 pt-5">
        {user.searchUser?.map((item, index) => (
          <SearchUserCard user={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default SearchComponents;
