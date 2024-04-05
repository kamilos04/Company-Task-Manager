package com.kamiljach.taskmanager.service;

import com.kamiljach.taskmanager.dto.UserDto;
import com.kamiljach.taskmanager.model.User;

public interface UserService {
    public UserDto findUserByJwtToken(String jwt) throws Exception;

    public UserDto findUserByEmail(String email) throws Exception;



}
