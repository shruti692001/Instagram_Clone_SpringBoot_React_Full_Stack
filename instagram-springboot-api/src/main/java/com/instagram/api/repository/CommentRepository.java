package com.instagram.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.instagram.api.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

}
