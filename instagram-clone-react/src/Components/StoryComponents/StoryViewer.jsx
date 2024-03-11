import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Progressbar from "./Progressbar";

const StoryViewerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #333;
`;
const StoryImage = styled.img`
  max-height: 90vh;
  object-fit: contain;
`;

const StoryViewer = ({ stories }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNextStory = () => {
    if (currentStoryIndex < stories?.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setActiveIndex(activeIndex + 1);
    } else if (currentStoryIndex === stories?.length - 1) {
      setCurrentStoryIndex(0);
      setActiveIndex(0);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextStory();
    }, 2000);

    return () => clearInterval(intervalId);
  }, [currentStoryIndex]);

  return (
    <div className="relative w-full">
      <StoryViewerContainer>
        <StoryImage
          src={stories?.[currentStoryIndex].image}
          alt="Story Image"
        />

        <div className="absolute top-0 flex w-full">
          {stories.map((item, index) => (
            <Progressbar
              key={index}
              duration={2000}
              index={index}
              activeIndex={activeIndex}
            />
          ))}
        </div>
      </StoryViewerContainer>
    </div>
  );
};

export default StoryViewer;
