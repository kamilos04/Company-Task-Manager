package com.kamiljach.taskmanager.service.impl;

import com.kamiljach.taskmanager.dto.TaskDto;
import com.kamiljach.taskmanager.model.Task;
import com.kamiljach.taskmanager.model.Team;
import com.kamiljach.taskmanager.model.User;
import com.kamiljach.taskmanager.repository.TaskRepository;
import com.kamiljach.taskmanager.repository.TeamRepository;
import com.kamiljach.taskmanager.repository.UserRepository;
import com.kamiljach.taskmanager.request.task.CreateTaskRequest;
import com.kamiljach.taskmanager.service.TaskService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {

    private TaskRepository taskRepository;
    private UserRepository userRepository;
    private TeamRepository teamRepository;

    public TaskServiceImpl(TaskRepository taskRepository, UserRepository userRepository, TeamRepository teamRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
    }

//    @Override
//    public Task createTask(CreateTaskRequest req) {
//        Task newTask = new Task();
//        newTask.setName(req.getName());
//        newTask.setTeams(req.getTeam());
//        return taskRepository.save(newTask);
//    }


    @Override
    public TaskDto createTask(CreateTaskRequest req) throws Exception{
        Task newTask = new Task();
        newTask.setName(req.getName());

        for(Long userId : req.getUsersIds()){
            Optional<User> optionalUser= userRepository.findById(userId);
            if(optionalUser.isEmpty()){
                throw new Exception("Invalid users");
            }
            User user = optionalUser.get();

            newTask.getUsers().add(user);
        }
        for(Long userId : req.getAdminsIds()){
            Optional<User> optionalUser= userRepository.findById(userId);
            if(optionalUser.isEmpty()){
                throw new Exception("Invalid admins");
            }
            User user = optionalUser.get();
            newTask.getAdmins().add(user);
        }
        for(Long teamId : req.getTeamsIds()){
            Optional<Team> optionalTask= teamRepository.findById(teamId);
            if(optionalTask.isEmpty()){
                throw new Exception("Invalid teams");
            }
            Team team = optionalTask.get();
            newTask.getTeams().add(team);
        }
        taskRepository.save(newTask);

        for(User user : newTask.getUsers()){
            user.getTasks().add(newTask);
            userRepository.save(user);
        }
        for(User user : newTask.getAdmins()){
            user.getTasksAdmin().add(newTask);
            userRepository.save(user);
        }
        for(Team team : newTask.getTeams()){
            team.getTasks().add(newTask);
            teamRepository.save(team);
        }


        TaskDto taskDto = new TaskDto(newTask);
        return taskDto;
    }

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
}
