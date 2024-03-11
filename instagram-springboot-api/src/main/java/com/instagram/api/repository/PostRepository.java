package com.instagram.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.instagram.api.model.Post;

public interface PostRepository extends JpaRepository<Post, Integer> {

	@Query("select p from Post p where p.user.id=?1")
	List<Post> findByUserId(Integer userId);

	@Query("SELECT p FROM Post p WHERE p.user.id IN :users ORDER BY p.createdAt DESC")
	List<Post> findAllPostByUserIds(@Param("users") List<Integer> userIds);
}
