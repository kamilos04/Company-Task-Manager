package com.kamiljach.taskmanager.service;

import com.kamiljach.taskmanager.dto.TaskDto;
import com.kamiljach.taskmanager.request.task.CreateTaskRequest;
import com.kamiljach.taskmanager.request.task.UpdateTaskRequest;
import com.kamiljach.taskmanager.response.TaskStatsResponse;
import com.kamiljach.taskmanager.response.task.TasksResponsePageable;

import java.util.List;

public interface TaskService {
    public TaskDto createTask(CreateTaskRequest req) throws Exception;

    public TaskDto updateTask(UpdateTaskRequest req, String jwt) throws Exception;
    public TasksResponsePageable getAllTasksWithSortingAndFiltering(String sortedBy, Long pageNumber, Long pageElementsNumber, List<String> filters, String sortDirection, String jwt) throws Exception;

    public void deleteTask(Long taskId, String jwt) throws Exception;

    public TasksResponsePageable findUsersAndHisTeamsTasks(Long userId, String sortedBy, Long pageNumber, Long pageElementsNumber, List<String> filters, String sortDirection, String jwt) throws Exception;

    public TaskStatsResponse getTaskStats(String jwt) throws Exception;
}
