package com.kamiljach.taskmanager.dto;

import com.kamiljach.taskmanager.model.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskDto {

    private Long id;

    private String name;

    private String desc;

    private String dateOfCreation;

    private TASK_PRIORITY priority;

    private TASK_STATUS status;

    private List<TeamDto> teams = new ArrayList<>();

    private List<UserDto> admins = new ArrayList<>();

    private List<UserDto> users = new ArrayList<>();

    public TaskDto(Task task){
        this.id = task.getId();
        this.name = task.getName();
        this.status = task.getStatus();
        this.desc = task.getDescription();
        this.dateOfCreation = dateToString(task.getDateOfCreation());
        //this.dateOfCreation = task.getDateOfCreation();
        this.priority = task.getPriority();

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

    public String dateToString(Date date){
        SimpleDateFormat simpleDateFormat= new SimpleDateFormat("dd-MM-yyyy HH:mm");
        return simpleDateFormat.format(date);
    }
}
