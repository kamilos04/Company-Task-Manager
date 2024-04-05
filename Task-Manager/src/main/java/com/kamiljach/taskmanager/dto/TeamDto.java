package com.kamiljach.taskmanager.dto;

import com.kamiljach.taskmanager.model.Task;
import com.kamiljach.taskmanager.model.User;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeamDto {
    private Long id;

    private String name;

    private List<UserDto> users = new ArrayList<>();

    private List<UserDto> admins = new ArrayList<>();

    private List<TaskDto> tasks = new ArrayList<>();
}
