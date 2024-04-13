package com.kamiljach.taskmanager.service;

import com.kamiljach.taskmanager.dto.UserDto;
import com.kamiljach.taskmanager.model.User;

import java.util.List;

public interface UserService {
    public UserDto findUserDtoByJwtToken(String jwt) throws Exception;

    public UserDto findUserDtoByEmail(String email) throws Exception;

    public User findUserByJwt(String jwt) throws Exception;

    public List<UserDto> findAllUsersSorted(String jwt) throws Exception;

}
