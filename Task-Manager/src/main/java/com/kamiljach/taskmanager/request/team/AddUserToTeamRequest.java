package com.kamiljach.taskmanager.request.team;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddUserToTeamRequest {
    private Long id;
    private Long userId;
}
