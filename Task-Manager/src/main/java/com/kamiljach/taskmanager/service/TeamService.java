package com.kamiljach.taskmanager.service;

import com.kamiljach.taskmanager.dto.TeamDto;
import com.kamiljach.taskmanager.dto.UserDto;
import com.kamiljach.taskmanager.request.team.AddUserToTeamRequest;
import com.kamiljach.taskmanager.request.team.CreateTeamRequest;

import java.util.List;

public interface TeamService {
    public TeamDto createTeam(CreateTeamRequest req) throws Exception;

    public List<TeamDto> allTeams();

    public TeamDto addUserToTeam(AddUserToTeamRequest req) throws Exception;
}
