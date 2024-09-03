package com.nc13.StayHo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class HomeController {
    @GetMapping("")
    public ResponseEntity<?> hone(){
        return ResponseEntity.ok("WELCOME_HOME");
    }
}
