package com.nc13.StayHo.controller;

import com.nc13.StayHo.service.impl.ImgServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/images")
public class ImgController {
    private final ImgServiceImpl imgService;


    @GetMapping("")
    public ResponseEntity<?> getImage(@RequestParam String path, @RequestParam String name) {
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

    @GetMapping("/{id}")
    public ResponseEntity<?> selectHotel(@PathVariable int id) {
        return ResponseEntity.ok(imgService.selectHotel(id));
    }

    @PutMapping("/update/hotel")
    public ResponseEntity<?> insertHotel(@RequestPart(value = "hotelId") int hotelId,
                                            @RequestPart(value = "files", required = false) List<MultipartFile> files,
                                            @RequestPart(value = "delImgList", required = false) int[] delImgList) {

        return ResponseEntity.ok(imgService.updateHotel(files,delImgList, hotelId));
    }
}
