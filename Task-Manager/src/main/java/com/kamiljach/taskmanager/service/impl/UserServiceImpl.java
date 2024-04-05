package com.kamiljach.taskmanager.service.impl;

import com.kamiljach.taskmanager.config.JwtProvider;
import com.kamiljach.taskmanager.dto.UserDto;
import com.kamiljach.taskmanager.model.User;
import com.kamiljach.taskmanager.repository.UserRepository;
import com.kamiljach.taskmanager.service.UserService;
import org.springframework.stereotype.Service;

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

//    public void removeLongListsFromUser(User user){
//        int index = 0;
//        for (int i = 0; i < user.getTeams().size(); i++){
//            user.getTeams().get(i).setUsers(new ArrayList<>());
//            user.getTeams().get(i).setTasks(new ArrayList<>());
//            user.getTeams().get(i).setAdmins(new ArrayList<>());
//            index++;
//        }
//        index = 0;
//        for (int i = 0; i < user.getTasks().size(); i++){
//            user.getTasks().get(i).setUsers(new ArrayList<>());
//            user.getTasks().get(i).setAdmins(new ArrayList<>());
//            user.getTasks().get(i).setTeams(new ArrayList<>());
//            index++;
//        }
//        index = 0;
//        for (int i = 0; i < user.getTasksAdmin().size(); i++){
//            user.getTasksAdmin().get(i).setUsers(new ArrayList<>());
//            user.getTasksAdmin().get(i).setAdmins(new ArrayList<>());
//            user.getTasksAdmin().get(i).setTeams(new ArrayList<>());
//            index++;
//        }
//        index = 0;
//        for (int i = 0; i < user.getTeamsAdmin().size(); i++){
//            user.getTeamsAdmin().get(i).setUsers(new ArrayList<>());
//            user.getTeamsAdmin().get(i).setAdmins(new ArrayList<>());
//            user.getTeamsAdmin().get(i).setTasks(new ArrayList<>());
//            index++;
//        }
//
//
//    }

    @Override
    public UserDto findUserByEmail(String email) throws Exception {
        User user = userRepository.findByEmail(email);
        if(user==null){
            throw new Exception("User not found");
        }
        UserDto userDto = new UserDto(user);
        return userDto;
    }
}
