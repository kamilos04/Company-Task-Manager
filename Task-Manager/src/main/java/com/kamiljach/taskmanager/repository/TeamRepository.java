package com.kamiljach.taskmanager.repository;

import com.kamiljach.taskmanager.model.Task;
import com.kamiljach.taskmanager.model.Team;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
    Optional<Team> findByName(String name);

    @Query("SELECT DISTINCT team FROM Team team " +
            "LEFT JOIN team.users teamUsers " +
            "LEFT JOIN team.admins teamAdmins " +
            "WHERE (:userId IN (SELECT user.id FROM team.users user) " +
            "OR :userId IN (SELECT user.id FROM team.admins user))")
    List<Team> findUsersTeams(@Param("userId") Long userId);
}
