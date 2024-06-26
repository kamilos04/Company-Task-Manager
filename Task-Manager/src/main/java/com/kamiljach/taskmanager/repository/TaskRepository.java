package com.kamiljach.taskmanager.repository;

import com.kamiljach.taskmanager.model.TASK_PRIORITY;
import com.kamiljach.taskmanager.model.TASK_STATUS;
import com.kamiljach.taskmanager.model.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    //No filtering
    @Query("SELECT DISTINCT task FROM Task task " +
            "LEFT JOIN task.users taskUsers " +
            "LEFT JOIN task.admins taskAdmins " +
            "LEFT JOIN task.teams taskTeams " +
            "LEFT JOIN taskTeams.users " +
            "LEFT JOIN taskTeams.admins " +
            "WHERE (:userId IN (SELECT user.id FROM task.users user) " +
            "OR :userId IN (SELECT user.id FROM task.admins user) " +
            "OR :userId IN (SELECT user.id FROM taskTeams.users user) " +
            "OR :userId IN (SELECT user.id FROM taskTeams.admins user)) " +
            "AND task.status IN :filtersStatus " +
            "AND task.priority IN :filtersPriority")
    Page<Task> findUsersAndHisTeamsTasks(@Param("userId") Long userId,
                                         @Param("filtersPriority") List<String> filtersPriority,
                                         @Param("filtersStatus") List<String> filtersStatus,
                                         Pageable pageable);


    @Query("SELECT DISTINCT task FROM Task task " +
            "WHERE task.status IN :filtersStatus " +
            "AND task.priority IN :filtersPriority")
    Page<Task> findAllTasksWithSortingAndFiltering(@Param("filtersPriority") List<String> filtersPriority,
                                                   @Param("filtersStatus") List<String> filtersStatus,
                                                   Pageable pageable);

    @Query("SELECT COUNT(DISTINCT task) FROM Task task " +
            "LEFT JOIN task.users taskUsers " +
            "LEFT JOIN task.admins taskAdmins " +
            "LEFT JOIN task.teams taskTeams " +
            "LEFT JOIN taskTeams.users " +
            "LEFT JOIN taskTeams.admins " +
            "WHERE (:userId IN (SELECT user.id FROM task.users user) " +
            "OR :userId IN (SELECT user.id FROM task.admins user) " +
            "OR :userId IN (SELECT user.id FROM taskTeams.users user) " +
            "OR :userId IN (SELECT user.id FROM taskTeams.admins user)) " +
            "AND task.priority = :priority")
    Long getCountOfPriority(@Param("userId") Long userId, @Param("priority") TASK_PRIORITY priority);

    @Query("SELECT COUNT(DISTINCT task) FROM Task task " +
            "LEFT JOIN task.users taskUsers " +
            "LEFT JOIN task.admins taskAdmins " +
            "LEFT JOIN task.teams taskTeams " +
            "LEFT JOIN taskTeams.users " +
            "LEFT JOIN taskTeams.admins " +
            "WHERE (:userId IN (SELECT user.id FROM task.users user) " +
            "OR :userId IN (SELECT user.id FROM task.admins user) " +
            "OR :userId IN (SELECT user.id FROM taskTeams.users user) " +
            "OR :userId IN (SELECT user.id FROM taskTeams.admins user)) " +
            "AND task.status = :status")
    Long getCountOfStatus(@Param("userId") Long userId, @Param("status") TASK_STATUS status);

}
