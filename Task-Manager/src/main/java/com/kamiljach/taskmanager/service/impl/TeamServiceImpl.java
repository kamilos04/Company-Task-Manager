package com.kamiljach.taskmanager.service.impl;

import com.kamiljach.taskmanager.dto.TeamDto;
import com.kamiljach.taskmanager.model.Task;
import com.kamiljach.taskmanager.model.Team;
import com.kamiljach.taskmanager.model.USER_ROLES;
import com.kamiljach.taskmanager.model.User;
import com.kamiljach.taskmanager.repository.TaskRepository;
import com.kamiljach.taskmanager.repository.TeamRepository;
import com.kamiljach.taskmanager.repository.UserRepository;
import com.kamiljach.taskmanager.request.team.UpdateTeamRequest;
import com.kamiljach.taskmanager.request.team.CreateTeamRequest;
import com.kamiljach.taskmanager.service.TeamService;
import com.kamiljach.taskmanager.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    @Override
    public TeamDto createTeam(CreateTeamRequest req) throws Exception{
        Team newTeam = new Team();
        newTeam.setName(req.getName());
        teamRepository.save(newTeam);

        for(Long userId : req.getUsersIds()){
            Optional<User> optionalUser= userRepository.findById(userId);
            if(optionalUser.isEmpty()){
                throw new Exception("Invalid users");
            }
            User user = optionalUser.get();
            newTeam.getUsers().add(user);
            user.getTeams().add(newTeam);
            userRepository.save(user);
        }
        for(Long userId : req.getAdminsIds()){
            Optional<User> optionalUser= userRepository.findById(userId);
            if(optionalUser.isEmpty()){
                throw new Exception("Invalid admins");
            }
            User user = optionalUser.get();
            newTeam.getAdmins().add(user);
            user.getTeamsAdmin().add(newTeam);
            userRepository.save(user);
        }
        for(Long taskId : req.getTasksIds()){
            Optional<Task> optionalTask= taskRepository.findById(taskId);
            if(optionalTask.isEmpty()){
                throw new Exception("Invalid tasks");
            }
            Task task = optionalTask.get();
            newTeam.getTasks().add(task);
            task.getTeams().add(newTeam);
            taskRepository.save(task);
        }
        teamRepository.save(newTeam);

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

    @Transactional
    @Override
    public TeamDto updateTeam(UpdateTeamRequest req, String jwt) throws Exception {
        User requestUser = userService.findUserByJwt(jwt);
        boolean namePermission = false;
        boolean usersPermission = false;
        boolean adminsPermission = false;
        boolean tasksPermission = false;

        Optional<Team> optionalTeam = teamRepository.findById(req.getId());
        if(optionalTeam.isEmpty()){throw new Exception("Invalid team");}
        Team team = optionalTeam.get();

        //Check permissions
        if(requestUser.getRole()== USER_ROLES.SUPER_ADMIN){
            namePermission = true;
            usersPermission = true;
            adminsPermission = true;
            tasksPermission = true;
        }
        else if(requestUser.getTeamsAdmin().contains(team)){
            usersPermission = true;
            tasksPermission = true;
            namePermission = true;
        }


        if(!req.getName().isEmpty() && req.getName() != null){
            if(namePermission){
                team.setName(req.getName());
            }
            else{
                throw new Exception("No permission");
            }
        }

        for(Long userId : req.getUsersIds()){
            if(usersPermission){
                Optional<User> optionalUser = userRepository.findById(userId);
                if(optionalUser.isEmpty()){throw new Exception("Invalid users");}
                User user = optionalUser.get();
                if(!team.getUsers().contains(user)){
                    team.getUsers().add(user);
                    user.getTeams().add(team);
                    userRepository.save(user);
                }
            }
            else{
                throw new Exception("No permission");
            }

        }

        for(Long userId : req.getAdminsIds()){
            if(adminsPermission){
                Optional<User> optionalUser= userRepository.findById(userId);
                if(optionalUser.isEmpty()){throw new Exception("Invalid admins");}
                User user = optionalUser.get();
                if(!team.getAdmins().contains(user)){
                    team.getAdmins().add(user);
                    user.getTeamsAdmin().add(team);
                    userRepository.save(user);
                }
            }
            else{
                throw new Exception("No permission");
            }

        }

        for(Long taskId : req.getTasksIds()){
            if(tasksPermission){
                Optional<Task> optionalTask= taskRepository.findById(taskId);
                if(optionalTask.isEmpty()){
                    throw new Exception("Invalid tasks");
                }
                Task task = optionalTask.get();
                if(!team.getTasks().contains(task)){
                    team.getTasks().add(task);
                    task.getTeams().add(team);
                    taskRepository.save(task);
                }
            }
            else{
                throw new Exception("No permission");
            }


        }
        teamRepository.save(team);
        TeamDto teamDto = new TeamDto(team);
        return teamDto;
    }
}
