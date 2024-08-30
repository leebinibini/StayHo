package com.nc13.StayHo.controller;

import com.nc13.StayHo.model.model.HotelImgDTO;
import com.nc13.StayHo.service.impl.ImgServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

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

    @GetMapping("/select/{id}")
    public ResponseEntity<?> selectHotel(@PathVariable int id) {
        return ResponseEntity.ok(imgService.selectHotel(id));
    }

    @PostMapping("/update/hotel")
    public ResponseEntity<Void> insertHotel(@RequestPart(value = "hotelId") int hotelId,
                                            @RequestPart(value = "files", required = false) List<MultipartFile> files,
                                            @RequestPart(value = "delImgList", required = false) int[] delImgList) {

        final String STATIC_PATH = "D:\\NC13\\StayHo_NC13\\src\\main\\resources\\static\\image\\";
        final String HOTEL_PATH= "hotel";
        if (files != null) {
            File pathDir = new File(HOTEL_PATH);
            if (!pathDir.exists()) {
                new File(HOTEL_PATH).mkdirs();
            }

            for (MultipartFile file : files) {
                String fileName = file.getOriginalFilename();
                String extension = fileName.substring(fileName.lastIndexOf("."));
                String uploadName = UUID.randomUUID() + extension;
                String path = STATIC_PATH + HOTEL_PATH;
                HotelImgDTO hotelImgDTO = new HotelImgDTO(HOTEL_PATH, uploadName, hotelId);
                File target = new File(path, uploadName);
                try {
                    file.transferTo(target);
                } catch (IOException e) {
                    e.printStackTrace();
                }
                imgService.insertHotel(hotelImgDTO);
            }
        }
        if (delImgList != null) {
            for (Integer id : delImgList) {
                imgService.delete(id);
            }
        }
        return ResponseEntity.ok().build();
    }
}
