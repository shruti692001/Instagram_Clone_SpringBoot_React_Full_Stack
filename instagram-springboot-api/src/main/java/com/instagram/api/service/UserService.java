package com.instagram.api.service;

import java.util.List;

import com.instagram.api.exceptions.UserException;
import com.instagram.api.model.UserModel;

public interface UserService {

	public UserModel registerUser(UserModel user) throws UserException;

	public List<UserModel> findAllUser() throws UserException;

	public UserModel findUserById(Integer userId) throws UserException;

	public UserModel findUserProfile(String token) throws UserException;

	public UserModel findUserByUsername(String username) throws UserException;

	public String followUser(Integer reqUserId, Integer followUserId) throws UserException;

	public String unfollowUser(Integer reqUserId, Integer unfollowUserId) throws UserException;

	public List<UserModel> findUsersByUserIds(List<Integer> userIds);

	public List<UserModel> searchUser(String query) throws UserException;

	public UserModel updateUserDetails(UserModel updatedUser, UserModel existingUser) throws UserException;
}
