package com.kamiljach.taskmanager.request.team;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateTeamRequest {
    private Long id;

    private String name;

    private List<Long> usersIds = new ArrayList<>();

    private List<Long> adminsIds = new ArrayList<>();

    private List<Long> tasksIds = new ArrayList<>();
}
