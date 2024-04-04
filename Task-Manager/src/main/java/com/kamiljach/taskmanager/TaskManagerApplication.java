package com.kamiljach.taskmanager;

import com.kamiljach.taskmanager.model.Team;
import com.kamiljach.taskmanager.model.User;
import com.kamiljach.taskmanager.repository.TaskRepository;
import com.kamiljach.taskmanager.repository.TeamRepository;
import com.kamiljach.taskmanager.repository.UserRepository;
import com.kamiljach.taskmanager.request.CreateTaskRequest;
import com.kamiljach.taskmanager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TaskManagerApplication {

	private static UserRepository userRepository;
	private static TeamRepository teamRepository;

	private static TaskRepository taskRepository;

	private static TaskService taskService;

	public TaskManagerApplication(UserRepository userRepository, TeamRepository teamRepository, TaskRepository taskRepository, TaskService taskService) {
		this.userRepository = userRepository;
		this.teamRepository = teamRepository;
		this.taskRepository = taskRepository;
		this.taskService = taskService;
	}

	public static void main(String[] args) {
		SpringApplication.run(TaskManagerApplication.class, args);


	}

}
