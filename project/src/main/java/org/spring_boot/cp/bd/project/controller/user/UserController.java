package org.spring_boot.cp.bd.project.controller.user;


import org.spring_boot.cp.bd.project.entity.user.User;
import org.spring_boot.cp.bd.project.services.user.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable int id) {
        return userService.getById(id).orElse(null);
    }

    @GetMapping("/username/{username}")
    public User getUserByName(@PathVariable String username) {
        return userService.getByName(username).orElse(null);
    }

    @GetMapping
    public List<User> getAllUsers(@RequestParam(required = false) String role) {
        return userService.getAll(role);
    }

    @PutMapping("/{id}")
    public void updateUser(@PathVariable int id, @RequestBody User user) {
        userService.updateUser(id, user);
    }
}
