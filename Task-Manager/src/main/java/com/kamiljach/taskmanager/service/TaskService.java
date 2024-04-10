package com.kamiljach.taskmanager.service;

import com.kamiljach.taskmanager.dto.TaskDto;
import com.kamiljach.taskmanager.dto.TeamDto;
import com.kamiljach.taskmanager.model.Task;
import com.kamiljach.taskmanager.request.task.CreateTaskRequest;
import com.kamiljach.taskmanager.request.task.UpdateTaskRequest;
import com.kamiljach.taskmanager.request.team.UpdateTeamRequest;
import com.kamiljach.taskmanager.response.task.MyTasksResponse;

import java.util.List;

public interface TaskService {
    public TaskDto createTask(CreateTaskRequest req) throws Exception;

    public TaskDto updateTask(UpdateTaskRequest req, String jwt) throws Exception;
    public List<Task> getAllTasks();

    public void deleteTask(Long taskId, String jwt) throws Exception;

    public MyTasksResponse findUsersAndHisTeamsTasks(Long userId, String sortedBy, Long pageNumber, Long pageElementsNumber, String jwt) throws Exception;
}
