package com.constellation.hackathon.model;

import javax.persistence.*;

@Entity
@Table(name = "user_details")
public class UserDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "username")
	private String username;
	@Column(name = "email")
	private String email;
	@Column(name = "city")
	private String city;
	@Column(name = "tin")
	private String tin;
	@Column(name = "description")
	private String description;
	@Column(name = "password")
	private String password;

	@Column(name = "cancer_status")
	private boolean status;

	public UserDetails() {

	}

	public UserDetails(String username, String email, String city, String tin, String description, String password, boolean status) {
		this.username = username;
		this.email = email;
		this.city = city;
		this.tin = tin;
		this.description = description;
		this.password = password;
		this.status = status;
	}

	public long getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getTin() {
		return tin;
	}

	public void setTin(String tin) {
		this.tin = tin;
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
				"username='" + username + '\'' +
				", email='" + email + '\'' +
				", city='" + city + '\'' +
				", tin='" + tin + '\'' +
				", description='" + description + '\'' +
				", status=" + status +
				'}';
	}
}
