package com.kamiljach.taskmanager.service.impl;

import com.kamiljach.taskmanager.model.Task;
import com.kamiljach.taskmanager.repository.TaskRepository;
import com.kamiljach.taskmanager.request.CreateTaskRequest;
import com.kamiljach.taskmanager.service.TaskService;
import org.springframework.stereotype.Service;

@Service
public class TaskServiceImpl implements TaskService {

    private TaskRepository taskRepository;

    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public Task createTask(CreateTaskRequest req) {
        Task newTask = new Task();
        newTask.setName(req.getName());
        newTask.setTeam(req.getTeam());
        return taskRepository.save(newTask);
    }
}
