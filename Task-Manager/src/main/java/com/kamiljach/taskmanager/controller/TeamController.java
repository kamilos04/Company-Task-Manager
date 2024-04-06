package com.kamiljach.taskmanager.controller;

import com.kamiljach.taskmanager.dto.TeamDto;
import com.kamiljach.taskmanager.request.CreateTeamRequest;
import com.kamiljach.taskmanager.service.TeamService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TeamController {
    TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @PostMapping("/team")
    public ResponseEntity<TeamDto> createTeam(@RequestBody CreateTeamRequest req, @RequestHeader("Authorization") String jwt) throws Exception {
        TeamDto newTeam =  teamService.createTeam(req);
        System.out.println(req.getUsersIds());
        return new ResponseEntity<>(newTeam, HttpStatus.CREATED);
    }

    @GetMapping("/team")
    public ResponseEntity<List<TeamDto>> allTeams(@RequestHeader("Authorization") String jwt){
        return new ResponseEntity<>(teamService.allTeams(), HttpStatus.OK);
    }
}
