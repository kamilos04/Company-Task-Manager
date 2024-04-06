package com.kamiljach.taskmanager.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateTeamRequest {
    private String name;

    private List<Long> usersIds = new ArrayList<>();

    private List<Long> adminsIds = new ArrayList<>();

    private List<Long> tasksIds = new ArrayList<>();

}
