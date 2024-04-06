package com.kamiljach.taskmanager.service;

import com.kamiljach.taskmanager.dto.TeamDto;
import com.kamiljach.taskmanager.model.Team;
import com.kamiljach.taskmanager.request.CreateTeamRequest;

import java.util.List;

public interface TeamService {
    public TeamDto createTeam(CreateTeamRequest req) throws Exception;

    public List<TeamDto> allTeams();
}
