package com.instagram.api.service;

import com.instagram.api.exceptions.CommentException;
import com.instagram.api.exceptions.PostException;
import com.instagram.api.exceptions.UserException;
import com.instagram.api.model.Comment;

public interface CommentService {
	Comment createComment(Comment comment, Integer postId, Integer userId) throws PostException, UserException;

	Comment findCommentById(Integer commentId) throws CommentException;

	Comment likeComment(Integer commentId, Integer userId) throws CommentException, UserException;

	Comment unlikeComment(Integer commentId, Integer userId) throws CommentException, UserException;
}
