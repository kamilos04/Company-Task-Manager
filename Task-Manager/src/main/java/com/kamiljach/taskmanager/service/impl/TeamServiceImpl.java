package com.kamiljach.taskmanager.service.impl;

import com.kamiljach.taskmanager.dto.TeamDto;
import com.kamiljach.taskmanager.model.Task;
import com.kamiljach.taskmanager.model.Team;
import com.kamiljach.taskmanager.model.User;
import com.kamiljach.taskmanager.repository.TaskRepository;
import com.kamiljach.taskmanager.repository.TeamRepository;
import com.kamiljach.taskmanager.repository.UserRepository;
import com.kamiljach.taskmanager.request.CreateTeamRequest;
import com.kamiljach.taskmanager.service.TeamService;
import com.kamiljach.taskmanager.service.UserService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TeamServiceImpl implements TeamService {
    private TeamRepository teamRepository;
    private UserService userService;
    private UserRepository userRepository;
    private TaskRepository taskRepository;

    public TeamServiceImpl(TeamRepository teamRepository, UserService userService, UserRepository userRepository, TaskRepository taskRepository) {
        this.teamRepository = teamRepository;
        this.userRepository = userRepository;
        this.userService = userService;
        this.taskRepository = taskRepository;
    }

    @Override
    public TeamDto createTeam(CreateTeamRequest req) throws Exception{
        Team newTeam = new Team();
        newTeam.setName(req.getName());

        for(Long userId : req.getUsersIds()){
            Optional<User> optionalUser= userRepository.findById(userId);
            if(optionalUser.isEmpty()){
                throw new Exception("Invalid users");
            }
            User user = optionalUser.get();

            newTeam.getUsers().add(user);
        }
        for(Long userId : req.getAdminsIds()){
            Optional<User> optionalUser= userRepository.findById(userId);
            if(optionalUser.isEmpty()){
                throw new Exception("Invalid admins");
            }
            User user = optionalUser.get();
            newTeam.getAdmins().add(user);
        }
        for(Long taskId : req.getTasksIds()){
            Optional<Task> optionalTask= taskRepository.findById(taskId);
            if(optionalTask.isEmpty()){
                throw new Exception("Invalid tasks");
            }
            Task task = optionalTask.get();
            newTeam.getTasks().add(task);
        }
        teamRepository.save(newTeam);

        for(User user : newTeam.getUsers()){
            user.getTeams().add(newTeam);
            userRepository.save(user);
        }
        for(User user : newTeam.getAdmins()){
            user.getTeamsAdmin().add(newTeam);
            userRepository.save(user);
        }
        for(Task task : newTeam.getTasks()){
            task.getTeams().add(newTeam);
            taskRepository.save(task);
        }


        TeamDto teamDto = new TeamDto(newTeam);
        return teamDto;

    }

    @Override
    public List<TeamDto> allTeams() {
        List<Team> teams = teamRepository.findAll();
        List<TeamDto> teamsDto = new ArrayList<>();
        for(Team team : teams){
            TeamDto teamDto = new TeamDto(team);
            teamsDto.add(teamDto);
        }
        return teamsDto;
    }
}
