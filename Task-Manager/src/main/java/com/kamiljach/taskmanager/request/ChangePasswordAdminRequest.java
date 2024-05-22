package com.kamiljach.taskmanager.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChangePasswordAdminRequest {
    private Long id;
    private String newPassword;
}
