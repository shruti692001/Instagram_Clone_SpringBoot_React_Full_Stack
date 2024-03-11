package com.instagram.api.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.instagram.api.exceptions.UserException;
import com.instagram.api.model.UserModel;
import com.instagram.api.repository.UserRepository;
import com.instagram.api.service.UserService;

@RestController
public class AuthController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserService userService;

	@PostMapping("/signup")
	public ResponseEntity<UserModel> registerUserHandler(@RequestBody UserModel user) throws UserException {
		UserModel createdUser = userService.registerUser(user);

		return new ResponseEntity<UserModel>(createdUser, HttpStatus.CREATED);
	}

	@GetMapping("/signin")
	public ResponseEntity<UserModel> signinHandler(Authentication auth) throws BadCredentialsException {

		Optional<UserModel> optionalUser = userRepository.findByEmail(auth.getName());

		if (optionalUser.isPresent()) {
			return new ResponseEntity<UserModel>(optionalUser.get(), HttpStatus.ACCEPTED);
		}

		throw new BadCredentialsException("invalid username or password");
	}

}
