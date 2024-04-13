package com.kamiljach.taskmanager.controller;

import com.kamiljach.taskmanager.dto.UserDto;
import com.kamiljach.taskmanager.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(("/api"))
public class UserController {

    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<UserDto> userProfileByJwt(@RequestHeader("Authorization") String jwt) throws Exception {
        UserDto userDto = userService.findUserDtoByJwtToken(jwt);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<UserDto> userProfileByEmail(@RequestParam("email") String email) throws Exception {
        UserDto userDto = userService.findUserDtoByEmail(email);

        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @GetMapping("/allusers")
    public ResponseEntity<List<UserDto>> allUsers(@RequestHeader("Authorization") String jwt) throws Exception {
        return new ResponseEntity<>(userService.findAllUsersSorted(jwt), HttpStatus.OK);
    }

}
