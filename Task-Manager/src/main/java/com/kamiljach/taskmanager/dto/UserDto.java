package com.kamiljach.taskmanager.dto;

import com.kamiljach.taskmanager.model.Task;
import com.kamiljach.taskmanager.model.Team;
import com.kamiljach.taskmanager.model.USER_ROLES;
import com.kamiljach.taskmanager.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private Long id;

    private String name;

    private String surname;

    private String email;

    private USER_ROLES role;


    private List<TeamDto> teams = new ArrayList<>();

    private List<TeamDto> teamsAdmin = new ArrayList<>();

    private List<TaskDto> tasksAdmin = new ArrayList<>();

    private List<TaskDto> tasks = new ArrayList<>();

    public UserDto(User user){
        this.id=user.getId();
        this.name=user.getName();
        this.surname=user.getSurname();
        this.email=user.getEmail();
        this.role=user.getRole();

        for(Team team : user.getTeams()){
            TeamDto teamDto = new TeamDto();

            teamDto.setId(team.getId());
            teamDto.setName(team.getName());

            this.teams.add(teamDto);
        }

        for(Team teamAdmin : user.getTeamsAdmin()){
            TeamDto teamDto = new TeamDto();

            teamDto.setId(teamAdmin.getId());
            teamDto.setName(teamAdmin.getName());

            this.teamsAdmin.add(teamDto);
        }

        for(Task task : user.getTasks()){
            TaskDto taskDto = new TaskDto();

            taskDto.setId(task.getId());
            taskDto.setName(task.getName());
            taskDto.setStatus(task.getStatus());
            taskDto.setDesc(task.getDescription());
            taskDto.setDateOfCreation(taskDto.dateToString(task.getDateOfCreation()));
            taskDto.setPriority(task.getPriority());

            this.tasks.add(taskDto);
        }

        for(Task taskAdmin : user.getTasksAdmin()){
            TaskDto taskDto = new TaskDto();

            taskDto.setId(taskAdmin.getId());
            taskDto.setName(taskAdmin.getName());
            taskDto.setStatus(taskAdmin.getStatus());
            taskDto.setDesc(taskAdmin.getDescription());
            taskDto.setDateOfCreation(taskDto.dateToString(taskAdmin.getDateOfCreation()));
            taskDto.setPriority(taskAdmin.getPriority());

            this.tasksAdmin.add(taskDto);
        }
    }

}
