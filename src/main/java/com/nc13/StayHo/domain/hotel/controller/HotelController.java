package com.nc13.StayHo.domain.hotel.controller;

import com.nc13.StayHo.domain.hotel.model.HotelDTO;
import com.nc13.StayHo.domain.hotel.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/hotel/")
public class HotelController {
    private HotelService HOTEL_SERVICE;

    @Autowired
    public HotelController(HotelService hotelService) {
        HOTEL_SERVICE = hotelService;
    }

    @GetMapping("showList")
    public HashMap<String, Object> selectList() {
        HashMap<String, Object> resultMap = new HashMap<>();
        resultMap.put("hotelList", HOTEL_SERVICE.selectAll());
        return resultMap;
    }

    @GetMapping("showOne/{id}")
    public HotelDTO selectOne(@PathVariable int id) {
        return HOTEL_SERVICE.selectOne(id);
    }


    @PostMapping("write")
    public HashMap<String, Object> write(
            @RequestPart("hotelDTO") HotelDTO hotelDTO) {

        HashMap<String, Object> resultMap = new HashMap<>();
        try {
            hotelDTO.setMemberId(1);  // 로그인 정보와 연결되면 이 부분을 수정
            String path = "/Users/jisue/Desktop/bit/studyBIT/StayHo_NC13 복사본 2/src/main/resources/static/images/hotel";

            // 파일 저장 디렉토리 생성
            File pathDir = new File(path);
            if (!pathDir.exists()) {
                pathDir.mkdirs();
            }

            // 파일 저장 로직
  /*          for (MultipartFile file : files) {
                if (!file.isEmpty()) {
                    String extension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
                    String uploadName = UUID.randomUUID().toString() + extension;
                    File f = new File(path, uploadName);
                    file.transferTo(f);
                }
            }*/

            // HotelDTO 저장 로직
            HOTEL_SERVICE.insert(hotelDTO);
            System.out.println(hotelDTO);
            resultMap.put("result", "success");
            resultMap.put("resultId", hotelDTO.getId());

        } catch (Exception e) {
            e.printStackTrace();
            resultMap.put("result", "fail");
        }

        return resultMap;
    }

    @PostMapping("update")
    public HashMap<String, Object> update(@RequestPart("hotelDTO") HotelDTO hotelDTO) {
        System.out.println("hotelDTO");
        HashMap<String, Object> resultMap = new HashMap<>();

        HOTEL_SERVICE.update(hotelDTO);
        resultMap.put("resultId", hotelDTO.getId());
        return resultMap;
    }

    @GetMapping("delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        HOTEL_SERVICE.delete(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("uploads")
    public Map<String, Object> uploads(MultipartHttpServletRequest request) {

        System.out.println("uploads/");
        System.out.println("request: " + request);
        Map<String, Object> resultMap = new HashMap<>();
        MultipartFile file = request.getFile("upload");
        System.out.println(file);
        if (file == null || file.isEmpty()) {
            resultMap.put("uploaded", false);
            resultMap.put("error", "No file uploaded");
            return resultMap;
        }

        System.out.println("file존재함");
        String fileName = file.getOriginalFilename();
        System.out.println(fileName);
        String extension = fileName.substring(fileName.lastIndexOf("."));
        String uploadName = UUID.randomUUID() + extension;
        System.out.println(uploadName);

        String realPath = request.getServletContext().getRealPath("/hotel/uploads/");
        System.out.println(realPath);
        Path realDir = Paths.get(realPath);
        System.out.println(realDir);
        if (!Files.exists(realDir)) {
            try {
                Files.createDirectories(realDir);
                System.out.println("success");
            } catch (IOException e) {
                e.printStackTrace();
                resultMap.put("uploaded", false);
                resultMap.put("error", "Could not create upload directory");
                return resultMap;
            }
        }

        File uploadFile = new File(realPath, uploadName);
        try {
            file.transferTo(uploadFile);
        } catch (IOException e) {
            e.printStackTrace();
            resultMap.put("uploaded", false);
            resultMap.put("error", "File transfer failed");
            return resultMap;
        }

        String uploadPath = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/hotel/uploads/")
                .path(uploadName)
                .toUriString();

        System.out.println(uploadPath);

        resultMap.put("uploaded", true);
        System.out.println("uploaded");
        resultMap.put("url", uploadPath);
        System.out.println(resultMap);
        return resultMap;
    }
}
