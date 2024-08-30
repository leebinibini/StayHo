package com.nc13.StayHo.controller;
import com.nc13.StayHo.model.model.HotelDTO;
import com.nc13.StayHo.service.origin.HotelService;
import com.nc13.StayHo.model.model.HotelImgDTO;
import com.nc13.StayHo.service.origin.ImgService;
import com.nc13.StayHo.model.model.LocationDTO;
import com.nc13.StayHo.service.impl.LocationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;

@RestController
@CrossOrigin
@RequestMapping("/hotel/")
public class HotelController {
    private final HotelService HOTEL_SERVICE;
    private final LocationServiceImpl LOCATION_SERVICE;
    private final ImgService IMG_SERVICE;
    private final String STATIC_PATH = "D:\\NC13\\StayHo_NC13\\src\\main\\resources\\static\\image\\";
    private final String HOTEL_PATH = "hotel";

    @Autowired
    public HotelController(HotelService hotelService, LocationServiceImpl locationServiceImpl, ImgService imgService) {
        this.HOTEL_SERVICE = hotelService;
        this.LOCATION_SERVICE= locationServiceImpl;
        this.IMG_SERVICE = imgService;
    }

    @GetMapping("showList")
    public HashMap<String, Object> selectList() {
        HashMap<String, Object> resultMap = new HashMap<>();
        List<HotelDTO> hotelList= HOTEL_SERVICE.selectAll();
        resultMap.put("hotelList", hotelList);
        return resultMap;
    }
    @GetMapping("showList/{id}")
    public HashMap<String, Object> selectList(@PathVariable int id) {
        HashMap<String, Object> resultMap = new HashMap<>();
        List<HotelDTO> hotelList= HOTEL_SERVICE.selectMember(id);
        resultMap.put("hotelList", hotelList);
        return resultMap;
    }

    @GetMapping("showOne/{id}")
    public ResponseEntity<Map<String, Object>> selectOne(@PathVariable int id) {
        HotelDTO hotelDTO = new HotelDTO();
        hotelDTO.setId(id);

        Map<String, Object> resultMap = new HashMap<>();
        List<HotelImgDTO> hotelImageList = IMG_SERVICE.selectHotel(id);
        if (hotelImageList.isEmpty()) {
            hotelImageList.add(new HotelImgDTO("hotel", "default.png", id));
        }
        resultMap.put("image", hotelImageList);
        resultMap.put("hotel", HOTEL_SERVICE.selectOne(id));

        return ResponseEntity.ok(resultMap);
    }

    @PostMapping("write")
    public HashMap<String, Object> write(
            @RequestPart(value = "hotelDTO") HotelDTO hotelDTO, @RequestPart(value = "files", required = false) List<MultipartFile> files,
            @RequestPart("address") LocationDTO locationDTO) {
        HashMap<String, Object> resultMap = new HashMap<>();

        try {
            HOTEL_SERVICE.insert(hotelDTO);

            locationDTO.setHotelId(hotelDTO.getId());
            LOCATION_SERVICE.insert(locationDTO);
            if (files != null) {
                insertImageProcess(files, hotelDTO.getId());
            }
            resultMap.put("result", "success");
            resultMap.put("resultId", hotelDTO.getId());

        } catch (Exception e) {
            e.printStackTrace();
            resultMap.put("result", "fail");
        }

        return resultMap;
    }

    private void insertImageProcess(List<MultipartFile> files, int hotelId) {
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
            IMG_SERVICE.insertHotel(hotelImgDTO);
        }
    }

    @PostMapping("update/{id}")
    public HashMap<String, Object> update(@RequestPart("hotelDTO") HotelDTO hotelDTO, @PathVariable int id) {
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
}