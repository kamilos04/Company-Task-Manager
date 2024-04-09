package com.kamiljach.taskmanager.service;

import com.kamiljach.taskmanager.dto.TeamDto;
import com.kamiljach.taskmanager.request.team.UpdateTeamRequest;
import com.kamiljach.taskmanager.request.team.CreateTeamRequest;

import java.util.List;

public interface TeamService {
    public TeamDto createTeam(CreateTeamRequest req) throws Exception;

    public List<TeamDto> allTeams();

    public TeamDto updateTeam(UpdateTeamRequest req, String jwt) throws Exception;

    public void deleteTeam(Long teamId, String jwt) throws Exception;
}
