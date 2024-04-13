package com.kamiljach.taskmanager.controller;

import com.kamiljach.taskmanager.dto.TeamDto;
import com.kamiljach.taskmanager.request.team.UpdateTeamRequest;
import com.kamiljach.taskmanager.request.team.CreateTeamRequest;
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

    //Create team
    @PostMapping("/team")
    public ResponseEntity<TeamDto> createTeam(@RequestBody CreateTeamRequest req, @RequestHeader("Authorization") String jwt) throws Exception {
        TeamDto newTeam =  teamService.createTeam(req);
        return new ResponseEntity<>(newTeam, HttpStatus.CREATED);
    }

    //All teams
    @GetMapping("/team")
    public ResponseEntity<List<TeamDto>> allTeams(@RequestHeader("Authorization") String jwt){
        return new ResponseEntity<>(teamService.allTeams(), HttpStatus.OK);
    }

    //Update team
    @PutMapping("/team")
    public ResponseEntity<TeamDto> updateTeam(@RequestBody UpdateTeamRequest req, @RequestHeader("Authorization") String jwt) throws Exception {
        return new ResponseEntity<>(teamService.updateTeam(req, jwt), HttpStatus.OK);
    }

    @DeleteMapping("/team")
    public ResponseEntity<Object> deleteTeam(@RequestParam Long id, @RequestHeader("Authorization") String jwt) throws Exception{
        teamService.deleteTeam(id, jwt);
        return new ResponseEntity<>(STR."Deleted team. ID: \{id}", HttpStatus.OK);

    }

    @GetMapping("/myteams")
    public ResponseEntity<List<TeamDto>> teamsOfUser(@RequestParam Long id, @RequestHeader("Authorization") String jwt) throws Exception{
        return new ResponseEntity<>(teamService.findUsersTeams(id, jwt), HttpStatus.OK);

    }
}
