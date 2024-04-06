package com.kamiljach.taskmanager.service;

import com.kamiljach.taskmanager.dto.TeamDto;
import com.kamiljach.taskmanager.model.Team;
import com.kamiljach.taskmanager.request.CreateTeamRequest;

public interface TeamService {
    public TeamDto createTeam(CreateTeamRequest req) throws Exception;
}
