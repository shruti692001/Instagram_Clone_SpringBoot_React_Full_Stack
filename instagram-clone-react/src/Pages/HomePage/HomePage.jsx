import React, { useEffect, useState } from "react";
import StoryCircle from "../../Components/Story/StoryCircle";
import HomeRight from "../../Components/HomeRight/HomeRight";
import PostCard from "./../../Components/Post/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { findUserPostAction } from "../../Redux/Post/Action";
import {
  findUserByUserIdsAction,
  getUserProfileAction,
} from "../../Redux/User/Action";
import { hasStory, suggetions, timeDifference } from "../../Config/Logics";

const HomePage = () => {
  const [userIds, setUserIds] = useState([]);
  const [suggestedUser, setSuggestedUser] = useState([]);

  const reqUser = useSelector((store) => store.user.reqUser);
  const { user, post } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    if (reqUser) {
      const newIds = reqUser?.following?.map((user) => user.id);
      setUserIds([reqUser?.id, ...newIds]);
      setSuggestedUser(suggetions(reqUser));
    }
  }, [reqUser]);

  useEffect(() => {
    const data = {
      userIds: [userIds].join(","),
      jwt: token,
    };

    if (userIds.length > 0) {
      dispatch(findUserPostAction(data));
      dispatch(findUserByUserIdsAction(data));
    }
  }, [userIds, post.createdPost, post.deletePost]);

  useEffect(() => {
    dispatch(getUserProfileAction(token));
  }, [token]);

  const storyUsers = hasStory(user.findUsersByUserIds);

  console.log("post user post", post?.userPosts);

  return (
    <div className="mt-10 flex w-[100%] justify-center">
      <div className="flex flex-col w-[44%] px-10 items-center">
        <div className="storyDiv flex space-x-2 border p-4 rounded-md justify-start w-full">
          {storyUsers.length > 0 &&
            storyUsers.map((item, index) => (
              <StoryCircle user={item} key={index} />
            ))}
        </div>

        <div className="space-y-10 postsBox w-full mt-10">
          {post?.userPosts?.length > 0 &&
            post?.userPosts?.map((item) => (
              <PostCard
                userProfileImage={
                  item.user?.userImage
                    ? item.user?.userImage
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                username={item?.user?.username}
                location={item?.location}
                postImage={item?.image}
                createdAt={timeDifference(item?.createdAt)}
                postId={item?.id}
                post={item}
              />
            ))}
        </div>
      </div>

      <div className="w-[30%] pr-10">
        <HomeRight suggestedUser={suggestedUser} />
      </div>
    </div>
  );
};

export default HomePage;
