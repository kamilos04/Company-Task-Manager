package com.kamiljach.taskmanager;

import com.kamiljach.taskmanager.model.Team;
import com.kamiljach.taskmanager.model.User;
import com.kamiljach.taskmanager.repository.TaskRepository;
import com.kamiljach.taskmanager.repository.TeamRepository;
import com.kamiljach.taskmanager.repository.UserRepository;
import com.kamiljach.taskmanager.service.TaskService;
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

		Team team1 = new Team();
		team1.setName("Testowa grupa");

		teamRepository.save(team1);

		User user1 = new User();
		user1.setName("Kamil");
		user1.setSurname("Jach");
		user1.setEmail("kamiljach2004@gmail.com");
		user1.setPassword("test");
		userRepository.save(user1);

		team1.getUsers().add(user1);
		user1.getTeams().add(team1);
		userRepository.save(user1);
		teamRepository.save(team1);

//		CreateTaskRequest request = new CreateTaskRequest();
//		request.setName("pierwszy");
//		taskService.createTask(request);



//		teamRepository.save(team1);


//		userRepository.save(user1);
	}

}
