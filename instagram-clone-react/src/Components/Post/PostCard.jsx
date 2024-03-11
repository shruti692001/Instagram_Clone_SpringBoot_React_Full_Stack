import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  BsBookmark,
  BsBookmarkFill,
  BsDot,
  BsEmojiSmile,
  BsThreeDots,
} from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";

import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  isPostLikedByUser,
  isReqUserPost,
  isSavedPost,
} from "../../Config/Logics";
import { createCommentAction } from "../../Redux/Comment/Action";
import {
  deletePostAction,
  likePostAction,
  savePostAction,
  unlikePostAction,
  unsavePostAction,
} from "../../Redux/Post/Action";
import CommentModal from "../Comment/CommentModal";
import "./PostCard.css";

const PostCard = ({
  userProfileImage,
  username,
  location,
  postImage,
  createdAt,
  post,
}) => {
  const [commentContent, setCommentContent] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [isPostLike, setIsPostLike] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [numberOfLikes, setNumberOfLike] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);
  const navigate = useNavigate();

  const data = {
    jwt: token,
    postId: post?.id,
  };

  // const handleCommnetInputChange = (e) => {
  //   setCommentContent(e.target.value);
  // };

  // const handleAddComment = () => {
  //   const data = {
  //     jwt: token,
  //     postId: post.id,
  //     data: {
  //       content: commentContent,
  //     },
  //   };
  //   console.log("comment content ", commentContent);
  //   dispatch(createCommentAction(data));
  // };

  // const handleOnEnterPress = (e) => {
  //   if (e.key === "Enter") {
  //     handleAddComment();
  //     setCommentContent("");
  //   } else return;
  // };

  const handlePostLike = () => {
    setIsPostLike(true);
    dispatch(likePostAction(data));
    setNumberOfLike(numberOfLikes + 1);
  };
  const handlePostUnlike = () => {
    setIsPostLike(false);
    dispatch(unlikePostAction(data));
    setNumberOfLike(numberOfLikes - 1);
  };

  const handleSavePost = () => {
    setIsSaved(true);
    dispatch(savePostAction(data));
  };
  const handleUnsavePost = () => {
    setIsSaved(false);
    dispatch(unsavePostAction(data));
  };

  const handleNavigate = (username) => {
    navigate(`/${username}`);
  };

  const handleOpenCommentModal = () => {
    navigate(`/comment/${post.id}`);
    onOpen();
  };

  const handleClick = () => {
    setShowDropDown(!showDropDown);
  };

  function handleWindowClick(event) {
    if (!event.target.matches(".dots")) {
      setShowDropDown(false);
    }
  }

  useEffect(() => {
    window.addEventListener("click", handleWindowClick);

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  const handleDeletePost = (postId) => {
    const data = {
      jwt: token,
      postId,
    };
    dispatch(deletePostAction(data));
  };
  const isOwnPost = isReqUserPost(post, user.reqUser);

  useEffect(() => {
    setIsPostLike(isPostLikedByUser(post, user.reqUser?.id));
    setIsSaved(isSavedPost(user.reqUser, post.id));
    setNumberOfLike(post?.likedByUser?.length);
  }, [post, user.reqUser]);

  return (
    <div>
      <div className="flex flex-col items-center w-full border rounded-md">
        <div className="flex justify-between items-center w-full py-4 px-5">
          <div className="flex items-center">
            <img
              className="w-12 h-12 rounded-full"
              src={userProfileImage}
              alt=""
            />
            <div className="pl-2">
              <p className="font-semibold text-sm flex items-center">
                <span
                  onClick={() => handleNavigate(username)}
                  className="cursor-pointer"
                >
                  {username}
                </span>

                <span className="opacity-50 flex items-center">
                  <BsDot />
                  {createdAt}
                </span>
              </p>
              <p className="font-thin text-sm">{location}</p>
            </div>
          </div>

          <div>
            <div className="dropdown">
              <BsThreeDots className="dots" onClick={handleClick} />

              {isOwnPost && (
                <div className="dropdown-content">
                  {showDropDown && (
                    <p
                      onClick={() => handleDeletePost(post.id)}
                      className="bg-black text-white py-1 px-4 rounded-md cursor-pointer"
                    >
                      Delete
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full">
          <img className="w-full" src={postImage} alt="" />
        </div>

        <div className="flex justify-between items-center w-full px-5 py-4">
          <div className="flex items-center space-x-2 ">
            {isPostLike ? (
              <AiFillHeart
                onClick={handlePostUnlike}
                className="text-2xl hover:opacity-50 cursor-pointer text-red-600"
              />
            ) : (
              <AiOutlineHeart
                onClick={handlePostLike}
                className="text-2xl hover:opacity-50 cursor-pointer "
              />
            )}

            <FaRegComment
              onClick={handleOpenCommentModal}
              className="text-xl hover:opacity-50 cursor-pointer"
            />
            <RiSendPlaneLine className="text-xl hover:opacity-50 cursor-pointer" />
          </div>
          <div className="cursor-pointer">
            {isSaved ? (
              <BsBookmarkFill onClick={handleUnsavePost} className="text-xl" />
            ) : (
              <BsBookmark
                className="text-xl hover:opacity-50 cursor-pointer"
                onClick={handleSavePost}
              />
            )}
          </div>
        </div>

        <div className="w-full py-2 px-5">
          {numberOfLikes > 0 && (
            <p className="text-sm">{numberOfLikes} likes</p>
          )}

          {post?.comments?.length > 0 && (
            <p
              onClick={handleOpenCommentModal}
              className="opacity-50 text-sm py-2 -z-0 cursor-pointer"
            >
              view all {post?.comments?.length} comments
            </p>
          )}
        </div>

        <div className="border border-t w-full">
          <div className="w-full flex items-center px-5">
            <BsEmojiSmile />
            <input
              className="commentInput"
              type="text"
              placeholder="Add a comment..."
              onChange={(e) => setCommentContent(e.target.value)}
              value={commentContent}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  const data = {
                    postId: post.id,
                    jwt: token,
                    data: {
                      content: commentContent,
                    },
                  };
                  dispatch(createCommentAction(data));
                  setCommentContent("");
                }
              }}
            />
          </div>
        </div>
      </div>

      <CommentModal
        handlePostLike={handlePostLike}
        handleSavePost={handleSavePost}
        handlePostUnlike={handlePostUnlike}
        handleUnsavePost={handleUnsavePost}
        isPostLike={isPostLike}
        isSaved={isSaved}
        isOpen={isOpen}
        onClose={onClose}
      />
    </div>
  );
};

export default PostCard;
