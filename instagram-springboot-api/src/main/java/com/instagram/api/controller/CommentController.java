package com.instagram.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.instagram.api.exceptions.CommentException;
import com.instagram.api.exceptions.PostException;
import com.instagram.api.exceptions.UserException;
import com.instagram.api.model.Comment;
import com.instagram.api.model.UserModel;
import com.instagram.api.service.CommentService;
import com.instagram.api.service.UserService;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

	@Autowired
	private CommentService commentService;

	@Autowired
	private UserService userService;

	@PostMapping("/create/{postId}")
	public ResponseEntity<Comment> createCommentHandler(@RequestBody Comment comment, @PathVariable Integer postId,
			@RequestHeader("Authorization") String token) throws UserException, PostException {

		UserModel user = userService.findUserProfile(token);

		Comment createdComment = commentService.createComment(comment, postId, user.getId());

		return new ResponseEntity<Comment>(createdComment, HttpStatus.CREATED);
	}

	@GetMapping("/{commentId}")
	public ResponseEntity<Comment> findCommentByIdHandler(@PathVariable Integer commentId) throws CommentException {
		Comment comment = commentService.findCommentById(commentId);

		return new ResponseEntity<Comment>(comment, HttpStatus.OK);
	}

	@PutMapping("/like/{commentId}")
	public ResponseEntity<Comment> likeCommentHandler(@RequestHeader("Authorization") String token,
			@PathVariable Integer commentId) throws UserException, CommentException {

		UserModel user = userService.findUserProfile(token);
		Comment likeComment = commentService.likeComment(commentId, user.getId());

		return new ResponseEntity<Comment>(likeComment, HttpStatus.OK);
	}

	@PutMapping("/unlike/{commentId}")
	public ResponseEntity<Comment> unlikeCommentHandler(@PathVariable Integer commentId,
			@RequestHeader("Authorization") String token) throws UserException, CommentException {

		UserModel user = userService.findUserProfile(token);
		Comment unlikeComment = commentService.unlikeComment(commentId, user.getId());

		return new ResponseEntity<Comment>(unlikeComment, HttpStatus.OK);
	}

}
