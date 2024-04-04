package com.kamiljach.taskmanager.controller;

import com.kamiljach.taskmanager.model.Task;
import com.kamiljach.taskmanager.request.CreateTaskRequest;
import com.kamiljach.taskmanager.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TaskController {

    private TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }
    @PostMapping("/task")
    public ResponseEntity<Task> createTask(@RequestBody CreateTaskRequest req){
        return new ResponseEntity<>(taskService.createTask(req), HttpStatus.CREATED);
    }
}
