package com.nc13.StayHo.domain.img.controller;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@RestController
@CrossOrigin
public class ImgController {
    @GetMapping("/image")
    public ResponseEntity<?> getImg(@RequestParam String path, @RequestParam String name) {
        System.out.println("사진 경로 탐");
        String finalPath="D:\\NC13\\StayHo_NC13\\src\\main\\resources\\static\\image\\"+path+"\\"+name;

        Resource resource= new FileSystemResource(finalPath);
        System.out.println(resource);
        HttpHeaders headers= new HttpHeaders();
        try {
            headers.add("Content-Type", Files.probeContentType(Paths.get(finalPath)));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(resource, headers, HttpStatus.OK);
    }
}
