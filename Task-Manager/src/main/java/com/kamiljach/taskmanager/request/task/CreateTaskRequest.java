package com.kamiljach.taskmanager.request.task;

import com.kamiljach.taskmanager.model.TASK_STATUS;
import com.kamiljach.taskmanager.model.Team;
import com.kamiljach.taskmanager.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateTaskRequest {

    private String name;

    private List<Long> teamsIds = new ArrayList<>();

    private List<Long> adminsIds = new ArrayList<>();

    private List<Long> usersIds = new ArrayList<>();
}
