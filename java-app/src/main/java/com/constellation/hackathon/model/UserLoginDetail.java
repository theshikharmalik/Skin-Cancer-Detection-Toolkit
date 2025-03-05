package com.constellation.hackathon.model;

import javax.persistence.*;

@Entity
@Table(name = "user_Cred")
public class UserLoginDetail {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "email")
	private String email;
	@Column(name = "password")
	private String password;


	public UserLoginDetail() {

	}

	public UserLoginDetail(String email, String password) {
		this.email = email;
		this.password = password;
	}

	public long getId() {
		return id;
	}


	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}


	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "UserDetails{" +
				", email='" + email + '\'' +
				'}';
	}
}
