package com.nc13.StayHo.domain.hotel.controller;

import com.nc13.StayHo.domain.hotel.model.HotelDTO;
import com.nc13.StayHo.domain.hotel.service.HotelService;
import com.nc13.StayHo.domain.hotelDescription.service.HotelDescriptionService;
import com.nc13.StayHo.domain.img.dto.HotelImgDTO;
import com.nc13.StayHo.domain.img.service.ImgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/hotel/")
public class HotelController {
    private final HotelService HOTEL_SERVICE;
    private final HotelDescriptionService HOTEL_DESCRIPTION_SERVICE;
    private final ImgService IMG_SERVICE;
    private final String STATIC_PATH = "/Users/jisue/Desktop/bit/studyBIT/StayHo_NC13 복사본 2/src/main/resources/static/image/";
    private final String HOTEL_PATH = "hotel";

    @Autowired
    public HotelController(HotelService hotelService, HotelDescriptionService hotelDescriptionService, ImgService imgService) {
        this.HOTEL_SERVICE = hotelService;
        this.HOTEL_DESCRIPTION_SERVICE = hotelDescriptionService;
        this.IMG_SERVICE = imgService;

    }

    @GetMapping("showList")
    public HashMap<String, Object> selectList() {
        HashMap<String, Object> resultMap = new HashMap<>();
        resultMap.put("hotelList", HOTEL_SERVICE.selectAll());
        return resultMap;
    }

    @GetMapping("showOne/{id}")
    public ResponseEntity<Map<String, Object>> selectOne(@PathVariable int id) {
        HotelDTO hotelDTO = new HotelDTO();
        hotelDTO.setId(id);

        System.out.println("hotel showOne processing");
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
            @RequestPart(value = "hotelDTO") HotelDTO hotelDTO, @RequestPart(value = "files", required = false) List<MultipartFile> files) {
        System.out.println(hotelDTO+ "/t"+files);
        HashMap<String, Object> resultMap = new HashMap<>();

        HotelDTO h = new HotelDTO();
        System.out.println("호텔번호: " +hotelDTO.getId());
        h.setId(hotelDTO.getId());
        h.setName(hotelDTO.getName());
        h.setTel(hotelDTO.getTel());
        h.setContent(hotelDTO.getContent());
        h.setMemberId(hotelDTO.getMemberId());

        HOTEL_SERVICE.insert(h);

        if (files == null || files.isEmpty()) {
            System.out.println("No files provided.");
        } else {
            insertImageProcess(files, h.getId());
        }

        resultMap.put("resultId", h.getId());

        return resultMap;
    }

    @PostMapping("updateHotel")
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

    private void insertImageProcess(List<MultipartFile> files, int hotelId) {
        File pathDir = new File(HOTEL_PATH);
        System.out.println("pathDir: " + pathDir);
        if (!pathDir.exists()) {
            new File(HOTEL_PATH).mkdirs();
        }

        for (MultipartFile file : files) {
            String fileName = file.getOriginalFilename();
            String extension = fileName.substring(fileName.lastIndexOf("."));
            String uploadName = UUID.randomUUID() + extension;
            String path = STATIC_PATH + HOTEL_PATH;
            System.out.println("path는" + path);

            HotelImgDTO hotelImgDTO = new HotelImgDTO(HOTEL_PATH, uploadName, hotelId);
            System.out.println("files = " + files + ", hotelId = " + hotelId);
            System.out.println("hotelImgDTO = " + hotelImgDTO);
            File target = new File(path, uploadName);
            try {
                file.transferTo(target);
            } catch (IOException e) {
                e.printStackTrace();
            }
            IMG_SERVICE.insertHotel(hotelImgDTO);
        }

    }
}