package com.kamiljach.taskmanager.dto;

import com.kamiljach.taskmanager.model.Task;
import com.kamiljach.taskmanager.model.Team;
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

    public TeamDto(Team team){
        this.id = team.getId();
        this.name = team.getName();
        for(User user : team.getUsers()){
            UserDto userDto = new UserDto();

            userDto.setId(user.getId());
            userDto.setName(user.getName());
            userDto.setRole(user.getRole());
            userDto.setSurname(user.getSurname());
            userDto.setEmail(user.getEmail());

            this.users.add(userDto);
        }
        
        for(User admin : team.getAdmins()){
            UserDto userDto = new UserDto();

            userDto.setId(admin.getId());
            userDto.setName(admin.getName());
            userDto.setRole(admin.getRole());
            userDto.setSurname(admin.getSurname());
            userDto.setEmail(admin.getEmail());

            this.users.add(userDto);
        }

        for(Task task : team.getTasks()){
            TaskDto taskDto = new TaskDto();

            taskDto.setId(task.getId());
            taskDto.setName(task.getName());
            taskDto.setStatus(task.getStatus());

            this.tasks.add(taskDto);
        }

    }
}
