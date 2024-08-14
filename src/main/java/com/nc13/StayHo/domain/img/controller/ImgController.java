package com.nc13.StayHo.domain.img.controller;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@RestController
@CrossOrigin
public class ImgController {
    @GetMapping("/image")
    public ResponseEntity<?> getImg(@RequestParam String path, @RequestParam String name) {
        String totalPath = "src\\main\\resources\\static\\image\\" + path + "\\" + name;

        Resource resource = new FileSystemResource(totalPath);
        HttpHeaders headers = new HttpHeaders();
        try {
            headers.add("Content-Type", Files.probeContentType(Paths.get(totalPath)));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(resource, headers, HttpStatus.OK);
    }
}
