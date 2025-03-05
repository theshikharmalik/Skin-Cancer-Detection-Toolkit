package com.constellation.hackathon.repository;

import java.util.List;

import com.constellation.hackathon.model.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDetailRepository extends JpaRepository<UserDetails, Long> {
  List<UserDetails> findByStatusContaining(boolean isCancer);

  List<UserDetails> findByUsernameContaining(String username);
}
