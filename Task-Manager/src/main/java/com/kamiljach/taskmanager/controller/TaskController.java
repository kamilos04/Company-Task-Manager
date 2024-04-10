package com.kamiljach.taskmanager.controller;

import com.kamiljach.taskmanager.dto.TaskDto;
import com.kamiljach.taskmanager.dto.TeamDto;
import com.kamiljach.taskmanager.request.task.CreateTaskRequest;
import com.kamiljach.taskmanager.request.task.UpdateTaskRequest;
import com.kamiljach.taskmanager.request.team.UpdateTeamRequest;
import com.kamiljach.taskmanager.response.task.MyTasksResponse;
import com.kamiljach.taskmanager.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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


    @PutMapping("/task")
    public ResponseEntity<TaskDto> updateTask(@RequestBody UpdateTaskRequest req, @RequestHeader("Authorization") String jwt) throws Exception {
        return new ResponseEntity<>(taskService.updateTask(req, jwt), HttpStatus.OK);
    }

//    @GetMapping("task")
//    public ResponseEntity<List<Task>> getAllTasks(){
//        List<Task> list= taskService.getAllTasks();
//        return new ResponseEntity<>(list, HttpStatus.OK);
//    }

    @DeleteMapping("/task")
    public ResponseEntity<Object> deleteTask(@RequestParam Long id, @RequestHeader("Authorization") String jwt) throws Exception{
        taskService.deleteTask(id, jwt);
        return new ResponseEntity<>(STR."Deleted task. ID: \{id}", HttpStatus.OK);

    }

    @GetMapping("/mytasks")
    public ResponseEntity<MyTasksResponse> findUsersAndHisTeamsTasks(@RequestParam Long id,
                                                                     @RequestParam String sortedBy,
                                                                     @RequestParam Long pageNumber,
                                                                     @RequestParam Long pageElementsNumber,
                                                                     @RequestHeader("Authorization") String jwt) throws Exception{
        return new ResponseEntity<>(taskService.findUsersAndHisTeamsTasks(id, sortedBy, pageNumber, pageElementsNumber, jwt), HttpStatus.OK);
    }
}
