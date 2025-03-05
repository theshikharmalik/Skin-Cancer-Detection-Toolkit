package com.constellation.hackathon.repository;

import com.constellation.hackathon.model.UserDetails;
import com.constellation.hackathon.model.UserLoginDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserLoginDetailRepository extends JpaRepository<UserLoginDetail, Long> {
    List<UserLoginDetail> findByEmailAndPassword(String email, String password);

}
