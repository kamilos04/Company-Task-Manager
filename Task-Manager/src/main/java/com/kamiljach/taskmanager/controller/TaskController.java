package com.kamiljach.taskmanager.controller;

import com.kamiljach.taskmanager.dto.TaskDto;
import com.kamiljach.taskmanager.model.Task;
import com.kamiljach.taskmanager.request.CreateTaskRequest;
import com.kamiljach.taskmanager.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TaskController {

    private TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping("/task")
    public ResponseEntity<TaskDto> createTask(@RequestBody CreateTaskRequest req, @RequestHeader("Authorization") String jwt) throws Exception {
        TaskDto createdTask = taskService.createTask(req);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }


//    @GetMapping("task")
//    public ResponseEntity<List<Task>> getAllTasks(){
//        List<Task> list= taskService.getAllTasks();
//        return new ResponseEntity<>(list, HttpStatus.OK);
//    }
}
