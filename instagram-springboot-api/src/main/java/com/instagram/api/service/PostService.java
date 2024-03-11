package com.instagram.api.service;

import java.util.List;

import com.instagram.api.exceptions.PostException;
import com.instagram.api.exceptions.UserException;
import com.instagram.api.model.Post;

public interface PostService {

	public Post createPost(Post post, Integer userId) throws UserException;

	public List<Post> findAllPost() throws PostException;

	public String deletePost(Integer postId, Integer userId) throws UserException, PostException;

	public List<Post> findPostByUserId(Integer userId) throws UserException;

	public Post findPostById(Integer postId) throws PostException;

	public List<Post> findAllPostByUserIds(List<Integer> userIds) throws PostException, UserException;

	public String savePost(Integer postId, Integer userId) throws PostException, UserException;

	public String unsavePost(Integer postId, Integer userId) throws PostException, UserException;

	public Post likePost(Integer postId, Integer userId) throws PostException, UserException;

	public Post unlikePost(Integer postId, Integer userId) throws PostException, UserException;

}
