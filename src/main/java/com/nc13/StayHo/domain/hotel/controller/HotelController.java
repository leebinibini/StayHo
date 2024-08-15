package com.nc13.StayHo.domain.hotel.controller;

import com.nc13.StayHo.domain.hotel.model.HotelDTO;
import com.nc13.StayHo.domain.hotel.service.HotelService;
import com.nc13.StayHo.domain.img.dto.HotelImgDTO;
import com.nc13.StayHo.domain.img.service.ImgService;
import com.nc13.StayHo.domain.location.dto.LocationDTO;
import com.nc13.StayHo.domain.location.service.LocationService;
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
    private final LocationService LOCATION_SERVICE;
    private final ImgService IMG_SERVICE;
    private final String STATIC_PATH = "D:\\NC13\\StayHo_NC13\\src\\main\\resources\\static\\image\\";
    private final String HOTEL_PATH = "hotel";

    @Autowired
    public HotelController(HotelService hotelService, LocationService locationService,ImgService imgService) {
        HOTEL_SERVICE = hotelService;
        this.LOCATION_SERVICE= locationService;
        this.IMG_SERVICE = imgService;
    }

    @GetMapping("showList")
    public HashMap<String, Object> selectList() {
        HashMap<String, Object> resultMap = new HashMap<>();
        List<HotelDTO> hotelList= HOTEL_SERVICE.selectAll();
        resultMap.put("hotelList", hotelList);
        List<List<HotelImgDTO>> list= new ArrayList<>();
        for (HotelDTO hotel: hotelList){
            List<HotelImgDTO> imgList= IMG_SERVICE.selectHotel(hotel.getId());
            if (imgList.isEmpty()){
                imgList.add(new HotelImgDTO("hotel", "default.png", hotel.getId()));
            }
            list.add(imgList);
        }
        resultMap.put("imgList", list);
        return resultMap;
    }

    @GetMapping("showOne/{id}")
    public HotelDTO selectOne(@PathVariable int id) {
        return HOTEL_SERVICE.selectOne(id);
    }


    @PostMapping("write")
    public HashMap<String, Object> write(
            @RequestPart("hotelDTO") HotelDTO hotelDTO,
            @RequestPart(value = "files", required = false) List<MultipartFile> files,
            @RequestPart("address") LocationDTO locationDTO) {
        HashMap<String, Object> resultMap = new HashMap<>();
        try {
            hotelDTO.setMemberId(1);  // 로그인 정보와 연결되면 이 부분을 수정

            // HotelDTO 저장 로직
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
    public void insertImageProcess(List<MultipartFile> files, int hotelId) {
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
}
