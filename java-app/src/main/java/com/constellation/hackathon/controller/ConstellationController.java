package com.constellation.hackathon.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.constellation.hackathon.controller.User;

import com.constellation.hackathon.model.UserDetails;
import com.constellation.hackathon.model.UserLoginDetail;
import com.constellation.hackathon.repository.UserDetailRepository;
import com.constellation.hackathon.repository.UserLoginDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ConstellationController {

	@Autowired
	UserDetailRepository userDetailRepository;
	@Autowired
	UserLoginDetailRepository userLoginDetailRepository;

	@GetMapping("/userDetails")
	public ResponseEntity<List<UserDetails>> getAllUsers(@RequestParam(required = false) String username) {
		try {
			List<UserDetails> userDetails = new ArrayList<UserDetails>();

				if (username == null)
				userDetailRepository.findAll().forEach(userDetails::add);
			else
				userDetailRepository.findByUsernameContaining(username).forEach(userDetails::add);

			if (userDetails.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(userDetails, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping ("/users/login")
	public User loginUser( @RequestParam  String email,@RequestParam  String password) {
		System.out.println("inside the user login method");
		try {
			List<UserLoginDetail> users = userLoginDetailRepository.findByEmailAndPassword(email, password);
			if (users.get(0).getEmail() != null) {
				return User.SUCCESS;
			}
		}catch (Exception e) {
			return User.FAILURE;
		}
		return User.FAILURE;

	}

	@GetMapping("/registerUserDetail/{id}")
	public ResponseEntity<UserDetails> getRegisterUserById(@PathVariable("id") long id) {
		Optional<UserDetails> userData = userDetailRepository.findById(id);

		if (userData.isPresent()) {
			return new ResponseEntity<>(userData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}




	@PostMapping("/registerUserDetail")
	public ResponseEntity<UserDetails> createUser(@RequestBody UserDetails userDetails) {
		try {
			UserDetails _userDetails = userDetailRepository
					.save(new UserDetails(userDetails.getUsername(), userDetails.getEmail(),userDetails.getCity(),userDetails.getTin(),userDetails.getDescription(),userDetails.getPassword(), false));
			userLoginDetailRepository.save(new UserLoginDetail(userDetails.getEmail(),userDetails.getPassword()));

			return new ResponseEntity<>(_userDetails, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/registerUserDetail/{id}")
	public ResponseEntity<UserDetails> updateUser(@PathVariable("id") long id, @RequestBody UserDetails userDetails) {
		Optional<UserDetails> registerUserData = userDetailRepository.findById(id);

		if (registerUserData.isPresent()) {
			UserDetails _userDetails = registerUserData.get();
			_userDetails.setUsername(userDetails.getUsername());
			_userDetails.setDescription(userDetails.getDescription());
			_userDetails.setStatus(userDetails.isStatus());
			return new ResponseEntity<>(userDetailRepository.save(_userDetails), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/registerUserDetail/{id}")
	public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") long id) {
		try {
			userDetailRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/registerUserDetailDelete")
	public ResponseEntity<HttpStatus> registerUserDetailDelete() {
		try {
			userDetailRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping("/registerUserDetail/cancerousActive")
	public ResponseEntity<List<UserDetails>> findByActiveCancerous() {
		try {
			List<UserDetails> userDetails = userDetailRepository.findByStatusContaining(false);

			if (userDetails.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(userDetails, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
