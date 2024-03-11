package com.instagram.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.instagram.api.exceptions.PostException;
import com.instagram.api.exceptions.UserException;
import com.instagram.api.model.Post;
import com.instagram.api.model.UserModel;
import com.instagram.api.response.MessageResponse;
import com.instagram.api.service.PostService;
import com.instagram.api.service.UserService;

@RestController
@RequestMapping("/api/posts")
public class PostController {
	@Autowired
	private PostService postService;

	@Autowired
	private UserService userService;

	@PostMapping("/create")
	public ResponseEntity<Post> createPostHndler(@RequestBody Post post, @RequestHeader("Authorization") String token)
			throws UserException {

		UserModel user = userService.findUserProfile(token);
		Post createdPost = postService.createPost(post, user.getId());

		return new ResponseEntity<Post>(createdPost, HttpStatus.CREATED);
	}

	@GetMapping("/all/{userId}")
	public ResponseEntity<List<Post>> findPostByUserId(@PathVariable Integer userId) throws UserException {
		List<Post> posts = postService.findPostByUserId(userId);

		return new ResponseEntity<List<Post>>(posts, HttpStatus.OK);
	}

	@GetMapping("/following/{userIds}")
	public ResponseEntity<List<Post>> findAllPostByUserIdsHandler(@PathVariable List<Integer> userIds)
			throws PostException, UserException {
		List<Post> posts = postService.findAllPostByUserIds(userIds);

		return new ResponseEntity<List<Post>>(posts, HttpStatus.OK);
	}

	@GetMapping("/{postId}")
	public ResponseEntity<Post> findPostByIdHandler(@PathVariable Integer postId) throws PostException {
		Post post = postService.findPostById(postId);

		return new ResponseEntity<Post>(post, HttpStatus.OK);
	}

	@PutMapping("/like/{postId}")
	public ResponseEntity<Post> likePostHndler(@PathVariable Integer postId,
			@RequestHeader("Authorization") String token) throws PostException, UserException {

		UserModel user = userService.findUserProfile(token);
		Post likedPost = postService.likePost(postId, user.getId());

		return new ResponseEntity<Post>(likedPost, HttpStatus.OK);
	}

	@PutMapping("/unlike/{postId}")
	public ResponseEntity<Post> unlikePostHandler(@PathVariable Integer postId,
			@RequestHeader("Authorization") String token) throws PostException, UserException {

		UserModel user = userService.findUserProfile(token);
		Post unlikePost = postService.unlikePost(postId, user.getId());

		return new ResponseEntity<Post>(unlikePost, HttpStatus.OK);
	}

	@DeleteMapping("/delete/{postId}")
	public ResponseEntity<MessageResponse> deletePostHandler(@PathVariable Integer postId,
			@RequestHeader("Authorization") String token) throws UserException, PostException {

		UserModel user = userService.findUserProfile(token);
		String message = postService.deletePost(postId, user.getId());

		MessageResponse res = new MessageResponse(message);

		return new ResponseEntity<MessageResponse>(res, HttpStatus.ACCEPTED);
	}

	@PutMapping("/save-post/{postId}")
	public ResponseEntity<MessageResponse> savedPostHandler(@PathVariable Integer postId,
			@RequestHeader("Authorization") String token) throws PostException, UserException {
		UserModel user = userService.findUserProfile(token);
		String savedPost = postService.savePost(postId, user.getId());

		MessageResponse res = new MessageResponse(savedPost);

		return new ResponseEntity<MessageResponse>(res, HttpStatus.ACCEPTED);
	}

	@PutMapping("/unsave-post/{postId}")
	public ResponseEntity<MessageResponse> unsavedPostHandler(@PathVariable Integer postId,
			@RequestHeader("Authorization") String token) throws UserException, PostException {
		UserModel user = userService.findUserProfile(token);
		String unsavedPost = postService.unsavePost(postId, user.getId());

		MessageResponse res = new MessageResponse(unsavedPost);

		return new ResponseEntity<MessageResponse>(res, HttpStatus.ACCEPTED);
	}

}
