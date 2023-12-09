package com.example.thedropshopservice.services;

import com.example.thedropshopservice.entities.User;
import com.example.thedropshopservice.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User signUp(String email, String username, String password) {
        if (checkString(email) && checkString(username) && checkString(password)) {
            var user = User.builder()
                    .email(email)
                    .username(username)
                    .password(password)
                    .build();
            return userRepository.save(user);
        }

        return null;
    }

    public User login(String email, String password) {
        var userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            var user = userOptional.get();
            user.setPassword("");
            return user;
        }

        return null;
    }

    public List<User> fetchUsers() {
        return userRepository.findAll();
    }

    private boolean checkString(String value) {
        return value != null && !value.isEmpty();
    }
}
