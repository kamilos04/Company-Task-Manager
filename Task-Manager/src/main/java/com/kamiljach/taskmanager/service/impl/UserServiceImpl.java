package com.kamiljach.taskmanager.service.impl;

import com.kamiljach.taskmanager.config.JwtProvider;
import com.kamiljach.taskmanager.dto.UserDto;
import com.kamiljach.taskmanager.model.User;
import com.kamiljach.taskmanager.repository.UserRepository;
import com.kamiljach.taskmanager.service.UserService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private JwtProvider jwtProvider;

    public UserServiceImpl(UserRepository userRepository, JwtProvider jwtProvider) {
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public UserDto findUserByJwtToken(String jwt) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        UserDto userDto = findUserByEmail(email);
        return userDto;
    }

    @Override
    public UserDto findUserByEmail(String email) throws Exception {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if(optionalUser.isEmpty()){
            throw new Exception("User not found");
        }
        UserDto userDto = new UserDto(optionalUser.get());
        return userDto;
    }
}
