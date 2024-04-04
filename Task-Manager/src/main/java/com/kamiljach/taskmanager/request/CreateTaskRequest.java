package com.kamiljach.taskmanager.request;

import com.kamiljach.taskmanager.model.Team;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateTaskRequest {

    private String name;

    private Team team;
}
