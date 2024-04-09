package com.kamiljach.taskmanager.repository;

import com.kamiljach.taskmanager.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
//    Optional<Task> findById(Long id);
//    Optional<Task> findByName(String name);
//    List<Task> findAll
}
