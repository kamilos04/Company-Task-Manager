package com.kamiljach.taskmanager.service.impl;

import com.kamiljach.taskmanager.dto.TaskDto;
import com.kamiljach.taskmanager.dto.TeamDto;
import com.kamiljach.taskmanager.model.Task;
import com.kamiljach.taskmanager.model.Team;
import com.kamiljach.taskmanager.model.USER_ROLES;
import com.kamiljach.taskmanager.model.User;
import com.kamiljach.taskmanager.repository.TaskRepository;
import com.kamiljach.taskmanager.repository.TeamRepository;
import com.kamiljach.taskmanager.repository.UserRepository;
import com.kamiljach.taskmanager.request.task.CreateTaskRequest;
import com.kamiljach.taskmanager.request.task.UpdateTaskRequest;
import com.kamiljach.taskmanager.request.team.UpdateTeamRequest;
import com.kamiljach.taskmanager.service.TaskService;
import com.kamiljach.taskmanager.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {

    private TaskRepository taskRepository;
    private UserRepository userRepository;
    private TeamRepository teamRepository;
    private UserService userService;

    public TaskServiceImpl(TaskRepository taskRepository, UserRepository userRepository, TeamRepository teamRepository, UserService userService) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
        this.userService = userService;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public TaskDto createTask(CreateTaskRequest req) throws Exception{
        Task newTask = new Task();
        newTask.setName(req.getName());
        newTask.setDescription(req.getDesc());
        newTask.setPriority(req.getPriority());
        newTask.setDateOfCreation(new Date());
        taskRepository.save(newTask);

        for(Long userId : req.getUsersIds()){
            Optional<User> optionalUser= userRepository.findById(userId);
            if(optionalUser.isEmpty()){
                throw new Exception("Invalid users");
            }
            User user = optionalUser.get();
            newTask.getUsers().add(user);

            user.getTasks().add(newTask);
            userRepository.save(user);
        }
        for(Long userId : req.getAdminsIds()){
            Optional<User> optionalUser= userRepository.findById(userId);
            if(optionalUser.isEmpty()){
                throw new Exception("Invalid admins");
            }
            User user = optionalUser.get();
            newTask.getAdmins().add(user);

            user.getTasksAdmin().add(newTask);
            userRepository.save(user);
        }
        for(Long teamId : req.getTeamsIds()){
            Optional<Team> optionalTask= teamRepository.findById(teamId);
            if(optionalTask.isEmpty()){
                throw new Exception("Invalid teams");
            }
            Team team = optionalTask.get();
            newTask.getTeams().add(team);

            team.getTasks().add(newTask);
            teamRepository.save(team);
        }
        taskRepository.save(newTask);


        TaskDto taskDto = new TaskDto(newTask);
        return taskDto;
    }


    @Transactional(rollbackFor = Exception.class)
    @Override
    public TaskDto updateTask(UpdateTaskRequest req, String jwt) throws Exception {
        User requestUser = userService.findUserByJwt(jwt);
        boolean statusPermission = false;
        boolean namePermission = false;
        boolean descPermission = false;
        boolean priorityPermission = false;
        boolean usersPermission = false;
        boolean adminsPermission = false;
        boolean teamsPermission = false;

        Optional<Task> optionalTask = taskRepository.findById(req.getId());
        if(optionalTask.isEmpty()){throw new Exception("Invalid task");}
        Task task = optionalTask.get();

        //Check permissions
        if(requestUser.getRole()== USER_ROLES.SUPER_ADMIN){
            namePermission = true;
            descPermission = true;
            priorityPermission = true;
            usersPermission = true;
            adminsPermission = true;
            teamsPermission = true;
        }
        else{
            boolean isAdminByTeamAdmin = false;
            for(Team t : requestUser.getTeamsAdmin()){
                if(task.getTeams().contains(t)){
                    isAdminByTeamAdmin = true;
                    break;
                }
            }

            if(requestUser.getTasksAdmin().contains(task) || isAdminByTeamAdmin){
                namePermission = true;
                descPermission = true;
                priorityPermission = true;
                usersPermission = true;
                teamsPermission = true;
                statusPermission = true;
            }
            else{
                boolean isMemberOfTaskTeams = false;
                for(Team t : requestUser.getTeams()){
                    if(task.getTeams().contains(t)){
                        isMemberOfTaskTeams = true;
                        break;
                    }
                }
                if(requestUser.getTasks().contains(task) || isMemberOfTaskTeams){
                    statusPermission = true;
                }
            }


        }


        if(req.getName() != null && !req.getName().isEmpty()){
            if(namePermission){
                task.setName(req.getName());
            }
            else{
                throw new Exception("No permission");
            }
        }

        if(req.getDescription() != null && !req.getDescription().isEmpty()){
            if(descPermission){
                task.setDescription(req.getDescription());
            }
            else{
                throw new Exception("No permission");
            }
        }

        if(req.getStatus() != null && !req.getStatus().equals("")){
            if(statusPermission){
                task.setStatus(req.getStatus());
            }
            else{
                throw new Exception("No permission");
            }
        }

        if(req.getPriority() != null && !req.getPriority().equals("")){
            if(priorityPermission){
                task.setPriority(req.getPriority());
            }
            else{
                throw new Exception("No permission");
            }
        }

        //Users
        if(req.getUsersIds() != null){
            if(usersPermission){
                //Removing users
                List<User> usersToRemove = new ArrayList<>();
                for(User user : task.getUsers()){
                    if(!req.getUsersIds().contains(user.getId())){
                        usersToRemove.add(user);
                    }
                }
                for(User user : usersToRemove){
                    task.getUsers().remove(user);
                    user.getTasks().remove(task);
                    userRepository.save(user);
                }

                //Adding users
                for(Long userId : req.getUsersIds()){
                    Optional<User> optionalUser = userRepository.findById(userId);
                    if(optionalUser.isEmpty()){throw new Exception("Invalid users");}
                    User user = optionalUser.get();
                    if(!task.getUsers().contains(user)){
                        task.getUsers().add(user);
                        user.getTasks().add(task);
                        userRepository.save(user);
                    }
                }
            }
            else{
                throw new Exception("No permission");
            }
        }
        //Admins
        if(req.getAdminsIds() != null){
            if(adminsPermission){
                //Removing admins
                List<User> adminsToRemove = new ArrayList<>();
                for(User user : task.getAdmins()){
                    if(!req.getAdminsIds().contains(user.getId())){
                        adminsToRemove.add(user);
                    }
                }
                for(User user : adminsToRemove){
                    task.getAdmins().remove(user);
                    user.getTasksAdmin().remove(task);
                    userRepository.save(user);
                }

                //Adding admins
                for(Long userId : req.getAdminsIds()){
                    Optional<User> optionalUser = userRepository.findById(userId);
                    if(optionalUser.isEmpty()){throw new Exception("Invalid users");}
                    User user = optionalUser.get();
                    if(!task.getAdmins().contains(user)){
                        task.getAdmins().add(user);
                        user.getTasksAdmin().add(task);
                        userRepository.save(user);
                    }
                }
            }
            else{
                throw new Exception("No permission");
            }
        }

        //Teams
        if(req.getTeamsIds() != null){
            if(teamsPermission){
                //Removing tasks
                List<Team> teamsToRemove = new ArrayList<>();
                for(Team team : task.getTeams()){
                    if(!req.getTeamsIds().contains(team.getId())){
                        teamsToRemove.add(team);
                    }
                }
                for(Team team : teamsToRemove){
                    task.getTeams().remove(team);
                    team.getTasks().remove(task);
                    teamRepository.save(team);
                }

                //Adding teams
                for(Long teamId : req.getTeamsIds()){
                    Optional<Team> optionalTeam = teamRepository.findById(teamId);
                    if(optionalTeam.isEmpty()){throw new Exception("Invalid users");}
                    Team team = optionalTeam.get();
                    if(!task.getTeams().contains(team)){
                        task.getTeams().add(team);
                        team.getTasks().add(task);
                        teamRepository.save(team);
                    }
                }
            }
            else{
                throw new Exception("No permission");
            }
        }

        taskRepository.save(task);
        TaskDto taskDto = new TaskDto(task);
        return taskDto;
    }
    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

//    public List<TaskDto> getAllMyTasks(){
//        List<Task> tasksList = taskRepository
//
//    }
}
