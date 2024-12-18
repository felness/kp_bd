package org.spring_boot.cp.bd.project.services.user;

import org.spring_boot.cp.bd.project.entity.user.User;
import org.spring_boot.cp.bd.project.repository.user.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAll(String role) {
        return userRepository.findAll(role);
    }

    public Optional<User> getByName(String name) {
        return userRepository.findByUsername(name);
    }

    public Optional<User> getById(int id) {
        return userRepository.findById(id);
    }

    public int updateUser (int id, User updated) {
        return userRepository.updateUser(id, updated);
    }
}
