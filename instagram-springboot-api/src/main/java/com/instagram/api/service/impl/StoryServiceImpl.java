package com.instagram.api.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.instagram.api.dto.UserDto;
import com.instagram.api.exceptions.StoryException;
import com.instagram.api.exceptions.UserException;
import com.instagram.api.model.Story;
import com.instagram.api.model.UserModel;
import com.instagram.api.repository.StoryRepository;
import com.instagram.api.service.StoryService;
import com.instagram.api.service.UserService;

@Service
public class StoryServiceImpl implements StoryService {
	@Autowired
	private StoryRepository storyRepository;

	@Autowired
	private UserService userService;

	@Override
	public Story createStory(Story story, Integer userId) throws UserException {
		UserModel user = userService.findUserById(userId);

		UserDto userDto = new UserDto();
		userDto.setId(user.getId());
		userDto.setUsername(user.getUsername());
		userDto.setEmail(user.getEmail());
		userDto.setName(user.getName());
		userDto.setUserImage(user.getImage());

		story.setUser(userDto);

		story.setTimestamp(LocalDateTime.now());

		user.getStories().add(story);

		return storyRepository.save(story);

	}

	@Override
	public List<Story> findStoryByUserId(Integer userId) throws UserException, StoryException {
		UserModel user = userService.findUserById(userId);
		List<Story> stories = user.getStories();

		if (stories.size() == 0) {
			throw new StoryException("this user doesn't have any story");
		}

		return stories;
	}

}
