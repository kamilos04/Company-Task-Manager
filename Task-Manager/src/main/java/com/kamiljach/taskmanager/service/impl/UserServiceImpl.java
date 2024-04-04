package com.kamiljach.taskmanager.service.impl;

import com.kamiljach.taskmanager.model.User;
import com.kamiljach.taskmanager.repository.UserRepository;
import com.kamiljach.taskmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public User createUser(User user) {
        return userRepository.save(user);

    }
}
