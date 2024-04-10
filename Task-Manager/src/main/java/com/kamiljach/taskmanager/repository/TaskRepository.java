package com.kamiljach.taskmanager.repository;

import com.kamiljach.taskmanager.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
//    Optional<Task> findById(Long id);
//    Optional<Task> findByName(String name);
//    List<Task> findAll

    @Query("SELECT DISTINCT task FROM Task task " +
            "LEFT JOIN task.users taskUsers " +
            "LEFT JOIN task.admins taskAdmins " +
            "LEFT JOIN task.teams taskTeams " +
            "LEFT JOIN taskTeams.users " +
            "LEFT JOIN taskTeams.admins " +
            "WHERE :userId IN (SELECT user.id FROM task.users user) " +
            "OR :userId IN (SELECT user.id FROM task.admins user) " +
            "OR :userId IN (SELECT user.id FROM taskTeams.users user) " +
            "OR :userId IN (SELECT user.id FROM taskTeams.admins user)")
    List<Task> findUsersAndHisTeamsTasks(@Param("userId") Long userId);


//    @Query("SELECT DISTINCT task FROM Task task " +
//            "LEFT JOIN FETCH task.users taskUsers " +
//            "LEFT JOIN FETCH task.teams taskTeams " +
//            "LEFT JOIN FETCH taskTeams.users " +
//            "WHERE :userId IN (SELECT user.id FROM task.users user) " +
//            "OR :userId IN (SELECT user.id FROM taskTeams.users user)")

//    @Query("SELECT DISTINCT task FROM Task task " +
//            "LEFT JOIN FETCH task.users taskUsers " +
//            "LEFT JOIN FETCH task.teams taskTeams " +
////            "LEFT JOIN FETCH taskTeams.users " +
//            "WHERE :userId IN (SELECT user.id FROM task.users user) ")
}
