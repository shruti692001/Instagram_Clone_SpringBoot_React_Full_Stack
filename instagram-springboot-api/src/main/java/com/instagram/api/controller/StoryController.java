package com.instagram.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.instagram.api.exceptions.StoryException;
import com.instagram.api.exceptions.UserException;
import com.instagram.api.model.Story;
import com.instagram.api.model.UserModel;
import com.instagram.api.service.StoryService;
import com.instagram.api.service.UserService;

@RestController
@RequestMapping("/api/stories")
public class StoryController {
	@Autowired
	private StoryService storyService;

	@Autowired
	private UserService userService;

	@PostMapping("/create")
	public ResponseEntity<Story> createStoryHandler(@RequestBody Story story,
			@RequestHeader("Authorization") String token) throws UserException {

		UserModel user = userService.findUserProfile(token);
		Story createdStory = storyService.createStory(story, user.getId());

		return new ResponseEntity<Story>(createdStory, HttpStatus.CREATED);
	}

	@GetMapping("/{userId}")
	public ResponseEntity<List<Story>> findStoryByUserIdHandler(@PathVariable Integer userId)
			throws UserException, StoryException {
		UserModel user = userService.findUserById(userId);

		List<Story> stories = storyService.findStoryByUserId(user.getId());

		return new ResponseEntity<List<Story>>(stories, HttpStatus.OK);
	}

}
