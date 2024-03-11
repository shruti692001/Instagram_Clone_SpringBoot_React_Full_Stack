package com.instagram.api.service.impl;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.instagram.api.dto.UserDto;
import com.instagram.api.exceptions.CommentException;
import com.instagram.api.exceptions.PostException;
import com.instagram.api.exceptions.UserException;
import com.instagram.api.model.Comment;
import com.instagram.api.model.Post;
import com.instagram.api.model.UserModel;
import com.instagram.api.repository.CommentRepository;
import com.instagram.api.repository.PostRepository;
import com.instagram.api.service.CommentService;
import com.instagram.api.service.PostService;
import com.instagram.api.service.UserService;

@Service
public class CommentServiceImpl implements CommentService {

	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private UserService userService;

	@Autowired
	private PostService postService;

	@Autowired
	private PostRepository postRepository;

	@Override
	public Comment createComment(Comment comment, Integer postId, Integer userId) throws PostException, UserException {
		UserModel user = userService.findUserById(userId);
		Post post = postService.findPostById(postId);

		UserDto userDto = new UserDto();
		userDto.setId(user.getId());
		userDto.setEmail(user.getEmail());
		userDto.setName(user.getName());
		userDto.setUsername(user.getUsername());
		userDto.setUserImage(user.getImage());

		comment.setUser(userDto);
		comment.setCreatedAt(LocalDateTime.now());
		Comment newComment = commentRepository.save(comment);
		post.getComments().add(newComment);
		postRepository.save(post);

		return newComment;
	}

	@Override
	public Comment findCommentById(Integer commentId) throws CommentException {
		Optional<Comment> optionalComment = commentRepository.findById(commentId);

		if (optionalComment.isPresent()) {
			return optionalComment.get();
		}

		throw new CommentException("comment not exist with id : " + commentId);
	}

	@Override
	public Comment likeComment(Integer commentId, Integer userId) throws CommentException, UserException {
		UserModel user = userService.findUserById(userId);
		Comment comment = findCommentById(commentId);

		UserDto userDto = new UserDto();
		userDto.setId(user.getId());
		userDto.setEmail(user.getEmail());
		userDto.setName(user.getName());
		userDto.setUsername(user.getUsername());
		userDto.setUserImage(user.getImage());

		comment.getLikedByUser().add(userDto);

		Comment likeComment = commentRepository.save(comment);

		return likeComment;
	}

	@Override
	public Comment unlikeComment(Integer commentId, Integer userId) throws CommentException, UserException {
		UserModel user = userService.findUserById(userId);
		Comment comment = findCommentById(commentId);

		UserDto userDto = new UserDto();
		userDto.setId(user.getId());
		userDto.setEmail(user.getEmail());
		userDto.setName(user.getName());
		userDto.setUsername(user.getUsername());
		userDto.setUserImage(user.getImage());

		comment.getLikedByUser().remove(userDto);
		Comment unlikeComment = commentRepository.save(comment);
		return unlikeComment;
	}

}
