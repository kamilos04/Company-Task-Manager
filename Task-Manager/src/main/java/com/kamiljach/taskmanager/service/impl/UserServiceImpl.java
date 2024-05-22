package com.kamiljach.taskmanager.service.impl;

import com.kamiljach.taskmanager.config.JwtProvider;
import com.kamiljach.taskmanager.dto.UserDto;
import com.kamiljach.taskmanager.model.USER_ROLES;
import com.kamiljach.taskmanager.model.User;
import com.kamiljach.taskmanager.repository.UserRepository;
import com.kamiljach.taskmanager.request.ChangePasswordAdminRequest;
import com.kamiljach.taskmanager.service.UserService;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private JwtProvider jwtProvider;
    private PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, JwtProvider jwtProvider, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDto findUserDtoByJwtToken(String jwt) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        UserDto userDto = findUserDtoByEmail(email);
        return userDto;
    }

    @Override
    public UserDto findUserDtoByEmail(String email) throws Exception {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if(optionalUser.isEmpty()){
            throw new Exception("User not found");
        }
        UserDto userDto = new UserDto(optionalUser.get());
        return userDto;
    }

    public User findUserByJwt(String jwt) throws Exception{
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if(optionalUser.isEmpty()){
            throw new Exception("User not found");
        }
        return optionalUser.get();
    }


    @Override
    public List<UserDto> findAllUsersSorted(String jwt) throws Exception {
        Sort sort = Sort.by(Sort.Direction.ASC, "surname");
        List<User> userList = userRepository.findAll(sort);
        List<UserDto> usersDto = new ArrayList<>();
        for(User user : userList){
            usersDto.add(new UserDto(user));
        }
        for(UserDto userDto : usersDto){
            userDto.setTasks(null);
            userDto.setTasksAdmin(null);
            userDto.setTeams(null);
            userDto.setTeamsAdmin(null);

        }
        return usersDto;
    }

    public void changePasswordAdmin(ChangePasswordAdminRequest req, String jwt) throws Exception {
        User reqUser = findUserByJwt(jwt);
        boolean permission = false;
        if (reqUser.getRole().equals(USER_ROLES.SUPER_ADMIN)){
            permission = true;
        }
        if(!permission){throw new Exception("No permission");}
        Optional<User> optionalUser = userRepository.findById(req.getId());
        if(optionalUser.isEmpty()){
            throw new Exception("Invalid user");
        }
        if(!(req.getNewPassword().length()>=5)){
            throw new Exception("Password to short");
        }
        User user = optionalUser.get();
        user.setPassword(passwordEncoder.encode(req.getNewPassword()));
        userRepository.save(user);
    }
}
