package com.instagram.api.model;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.instagram.api.dto.UserDto;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Post")
public class Post {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Embedded
	@AttributeOverrides({ @AttributeOverride(name = "id", column = @Column(name = "user_id")),
			@AttributeOverride(name = "email", column = @Column(name = "user_email")) })
	private UserDto user;

	@Column(nullable = false)
	private String caption;
	
	@Column(nullable = false)
	private String image;
	private String location;
	private LocalDateTime createdAt;

	@OneToMany
	private List<Comment> comments = new ArrayList<>();

	@Embedded
	@ElementCollection
	@JoinTable(name = "likedByUsers", joinColumns = @JoinColumn(name = "user_id"))
	private Set<UserDto> likedByUser = new HashSet<UserDto>();

}
