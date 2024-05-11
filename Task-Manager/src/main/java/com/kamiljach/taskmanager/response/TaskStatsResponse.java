package com.kamiljach.taskmanager.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskStatsResponse {
    Long waiting;
    Long inProgress;
    Long finished;
    Long low;
    Long medium;
    Long high;
}
