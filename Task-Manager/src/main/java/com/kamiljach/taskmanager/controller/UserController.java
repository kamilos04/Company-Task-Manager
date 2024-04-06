package com.kamiljach.taskmanager.controller;

import com.kamiljach.taskmanager.dto.UserDto;
import com.kamiljach.taskmanager.model.User;
import com.kamiljach.taskmanager.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(("/api"))
public class UserController {

    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<UserDto> userProfileByJwt(@RequestHeader("Authorization") String jwt) throws Exception {
        UserDto userDto = userService.findUserByJwtToken(jwt);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<UserDto> userProfileByEmail(@RequestParam("email") String email) throws Exception {
        UserDto userDto = userService.findUserByEmail(email);

        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

}
