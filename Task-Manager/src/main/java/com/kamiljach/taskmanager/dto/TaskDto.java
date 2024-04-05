package com.kamiljach.taskmanager.dto;

import com.kamiljach.taskmanager.model.TASK_STATUS;
import com.kamiljach.taskmanager.model.Team;
import com.kamiljach.taskmanager.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskDto {

    private Long id;

    private String name;

//    @Enumerated(EnumType.STRING)
    private TASK_STATUS status = TASK_STATUS.WAITING;

    private List<TeamDto> teams = new ArrayList<>();

    private List<UserDto> admins = new ArrayList<>();

    private List<UserDto> users = new ArrayList<>();
}
