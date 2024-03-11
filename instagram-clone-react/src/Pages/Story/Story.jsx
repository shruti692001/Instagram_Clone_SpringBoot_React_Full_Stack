import React, { useEffect } from "react";
import StoryViewer from "../../Components/StoryComponents/StoryViewer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findStoryByUserId } from "../../Redux/Story/Action";

const Story = () => {
  const { userId } = useParams();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { story } = useSelector((store) => store);

  // const story = [
  //   {
  //     image:
  //       "https://images.pexels.com/photos/11280359/pexels-photo-11280359.jpeg?auto=compress&cs=tinysrgb&w=600",
  //   },
  //   {
  //     image:
  //       "https://images.pexels.com/photos/11280357/pexels-photo-11280357.jpeg?auto=compress&cs=tinysrgb&w=600",
  //   },
  //   {
  //     image:
  //       "https://images.pexels.com/photos/16042134/pexels-photo-16042134/free-photo-of-city-streets-creative-street.jpeg?auto=compress&cs=tinysrgb&w=600",
  //   },
  //   {
  //     image:
  //       "https://images.pexels.com/photos/604684/pexels-photo-604684.jpeg?auto=compress&cs=tinysrgb&w=600",
  //   },
  //   {
  //     image:
  //       "https://images.pexels.com/photos/459335/pexels-photo-459335.jpeg?auto=compress&cs=tinysrgb&w=600",
  //   },
  // ];

  useEffect(() => {
    const data = { jwt: token, userId };
    dispatch(findStoryByUserId(data));
  }, [userId]);

  return (
    <div>
      {story.stories?.length > 0 && <StoryViewer stories={story.stories} />}
    </div>
  );
};

export default Story;
