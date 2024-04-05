package com.kamiljach.taskmanager.dto;

import com.kamiljach.taskmanager.model.TASK_STATUS;
import com.kamiljach.taskmanager.model.Task;
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

    private TASK_STATUS status = TASK_STATUS.WAITING;

    private List<TeamDto> teams = new ArrayList<>();

    private List<UserDto> admins = new ArrayList<>();

    private List<UserDto> users = new ArrayList<>();

    public TaskDto(Task task){
        this.id = task.getId();
        this.name = task.getName();
        this.status = task.getStatus();

        for(Team team : task.getTeams()){
            TeamDto teamDto = new TeamDto();

            teamDto.setId(team.getId());
            teamDto.setName(team.getName());

            this.teams.add(teamDto);
        }

        for(User user : task.getUsers()){
            UserDto userDto = new UserDto();

            userDto.setId(user.getId());
            userDto.setName(user.getName());
            userDto.setRole(user.getRole());
            userDto.setSurname(user.getSurname());
            userDto.setEmail(user.getEmail());

            this.users.add(userDto);
        }

        for(User admin : task.getAdmins()){
            UserDto userDto = new UserDto();

            userDto.setId(admin.getId());
            userDto.setName(admin.getName());
            userDto.setRole(admin.getRole());
            userDto.setSurname(admin.getSurname());
            userDto.setEmail(admin.getEmail());

            this.admins.add(userDto);
        }
    }
}
