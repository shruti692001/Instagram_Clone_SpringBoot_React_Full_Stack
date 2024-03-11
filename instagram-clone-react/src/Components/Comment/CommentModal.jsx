import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  BsBookmark,
  BsBookmarkFill,
  BsEmojiSmile,
  BsThreeDots,
} from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";

import "./CommentModal.css";
import CommentCard from "./CommentCard";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommentAction,
  findPostCommentAction,
} from "./../../Redux/Comment/Action";
import { useParams } from "react-router-dom";
import { findPostByIdAction } from "../../Redux/Post/Action";
import { timeDifference } from "../../Config/Logics";

const CommentModal = ({
  handlePostLike,
  handleSavePost,
  handlePostUnlike,
  handleUnsavePost,
  isPostLike,
  isSaved,
  isOpen,
  onClose,
}) => {
  const [commentContent, setCommentContent] = useState("");

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { postId } = useParams();
  const { comment, post, user } = useSelector((store) => store);

  console.log("post: ", post);

  useEffect(() => {
    const data = {
      jwt: token,
      postId,
    };

    if (postId) {
      dispatch(findPostByIdAction(data));
    }
  }, [comment?.createdComment, postId]);

  return (
    <div>
      <Modal size={"4xl"} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <div className="flex h-[75vh] ">
              <div className="w-[45%] flex flex-col justify-center">
                <img
                  className="max-h-full max-w-full"
                  src={post.singlePost?.image}
                  alt=""
                />
              </div>
              <div className="w-[55%] pl-10 relative">
                <div className="reqUser flex justify-between items-center py-5">
                  <div className="flex items-center">
                    <div className="">
                      <img
                        className="w-9 h-9 rounded-full"
                        src={
                          user.reqUser.image ||
                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        }
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p>{post?.singlePost?.user?.name}</p>
                      <p>{post?.singlePost?.user?.username}</p>
                    </div>
                  </div>
                  <BsThreeDots />
                </div>
                <hr />

                <div className="comments ">
                  {post?.singlePost?.comments?.length > 0 &&
                    post?.singlePost?.comments?.map((item, index) => (
                      <CommentCard comment={item} key={index} />
                    ))}
                </div>

                <div className=" absolute bottom-0 w-[90%]">
                  <div className="flex justify-between items-center w-full mt-5">
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

                      <FaRegComment className="text-xl hover:opacity-50 cursor-pointer" />
                      <RiSendPlaneLine className="text-xl hover:opacity-50 cursor-pointer" />
                    </div>
                    <div className="cursor-pointer">
                      {isSaved ? (
                        <BsBookmarkFill
                          onClick={handleUnsavePost}
                          className="text-xl"
                        />
                      ) : (
                        <BsBookmark
                          className="text-xl hover:opacity-50 cursor-pointer"
                          onClick={handleSavePost}
                        />
                      )}
                    </div>
                  </div>

                  <div className="w-full py-2">
                    {post.singlePost?.likedByUser.length > 0 && (
                      <p className="text-sm font-semibold py-2">
                        {post.singlePost?.likedByUser.length} likes
                      </p>
                    )}

                    <p className="opacity-70 pb-5">
                      {timeDifference(post?.singlePost?.createdAt)}
                    </p>
                  </div>

                  <div className=" flex items-center ">
                    <BsEmojiSmile className="mr-3 text-xl" />
                    <input
                      className="commentInput w-[70%]"
                      placeholder="Add Comment..."
                      type="text"
                      onChange={(e) => setCommentContent(e.target.value)}
                      value={commentContent}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          const data = {
                            postId,
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
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CommentModal;
