package com.kamiljach.taskmanager.service.impl;

import com.kamiljach.taskmanager.model.Task;
import com.kamiljach.taskmanager.repository.TaskRepository;
import com.kamiljach.taskmanager.request.CreateTaskRequest;
import com.kamiljach.taskmanager.service.TaskService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    private TaskRepository taskRepository;

    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

//    @Override
//    public Task createTask(CreateTaskRequest req) {
//        Task newTask = new Task();
//        newTask.setName(req.getName());
//        newTask.setTeams(req.getTeam());
//        return taskRepository.save(newTask);
//    }


    @Override
    public Task createTask(CreateTaskRequest req) {
        Task newTask = new Task();
        newTask.setName(req.getName());
        newTask.setAdmins(new ArrayList<>());
        newTask.setTeams(new ArrayList<>());
        newTask.setUsers(new ArrayList<>());

        return taskRepository.save(newTask);
    }

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
}
