package com.kamiljach.taskmanager.response.task;

import com.kamiljach.taskmanager.dto.TaskDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TasksResponsePageable {
    private Long totalElements;
    private List<TaskDto> tasks;
}