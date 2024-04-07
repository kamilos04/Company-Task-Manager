package com.kamiljach.taskmanager.request.task;

import com.kamiljach.taskmanager.model.TASK_PRIORITY;
import com.kamiljach.taskmanager.model.TASK_STATUS;
import com.kamiljach.taskmanager.model.Team;
import com.kamiljach.taskmanager.model.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateTaskRequest {
    private Long id;

    private String name;

    private String description;

//    private Date dateOfCreation;

    private TASK_PRIORITY priority;

    private TASK_STATUS status;

    private List<Long> teamsIds = new ArrayList<>();

    private List<Long> adminsIds = new ArrayList<>();

    private List<Long> usersIds = new ArrayList<>();
}
