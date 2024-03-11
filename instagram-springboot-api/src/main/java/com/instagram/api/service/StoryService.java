package com.instagram.api.service;

import java.util.List;

import com.instagram.api.exceptions.StoryException;
import com.instagram.api.exceptions.UserException;
import com.instagram.api.model.Story;

public interface StoryService {

	Story createStory(Story story, Integer userId) throws UserException;

	List<Story> findStoryByUserId(Integer userId) throws UserException, StoryException;
}
