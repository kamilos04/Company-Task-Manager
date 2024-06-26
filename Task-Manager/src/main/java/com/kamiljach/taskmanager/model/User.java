package com.kamiljach.taskmanager.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "app_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String surname;

    @NotBlank
    private String email;

    @Enumerated(EnumType.STRING)
    private USER_ROLES role = USER_ROLES.USER;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotBlank
    private String password;


    @ManyToMany(mappedBy = "users", fetch = FetchType.LAZY)
    private List<Team> teams = new ArrayList<>();

    @ManyToMany(mappedBy = "admins", fetch = FetchType.LAZY)
    private List<Team> teamsAdmin = new ArrayList<>();

    @ManyToMany(mappedBy = "admins", fetch = FetchType.LAZY)
    private List<Task> tasksAdmin = new ArrayList<>();

    @ManyToMany(mappedBy = "users", fetch = FetchType.LAZY)
    private List<Task> tasks = new ArrayList<>();

}
