package com.kamiljach.taskmanager.service;

import com.kamiljach.taskmanager.model.User;

public interface UserService {
    public User findUserByJwtToken(String jwt) throws Exception;

    public User findUserByEmail(String email) throws Exception;


}
