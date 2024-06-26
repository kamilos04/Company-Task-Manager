package com.kamiljach.taskmanager.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping("/api/test")
    public ResponseEntity<String> TestController(){
        return new ResponseEntity<>("Works", HttpStatus.OK);
    }
}
