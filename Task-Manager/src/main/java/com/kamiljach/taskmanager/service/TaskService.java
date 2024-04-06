package com.kamiljach.taskmanager.service;

import com.kamiljach.taskmanager.model.Task;
import com.kamiljach.taskmanager.request.CreateTaskRequest;

import java.util.List;

public interface TaskService {
    public Task createTask(CreateTaskRequest req);

    public List<Task> getAllTasks();
}
