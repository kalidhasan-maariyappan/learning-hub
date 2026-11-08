package com.example.patientapi.user;


import com.example.patientapi.error.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    private final UserRepository users;

    public UserService(UserRepository users) {
        this.users = users;
    }

    @Transactional(readOnly = true)
    public UserResponse currentUser(String subject) {
        try {
            return UserResponse.from(users.findById(Long.valueOf(subject))
                .orElseThrow(() -> new ResourceNotFoundException("User not found")));
        } catch (NumberFormatException exception) {
            throw new ResourceNotFoundException("User not found");
        }
    }
}
