package com.nc13.StayHo.domain.hotelDescription.controller;

import com.nc13.StayHo.domain.hotelDescription.model.HotelDescriptionDTO;
import com.nc13.StayHo.domain.hotelDescription.service.HotelDescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;

@RestController
@CrossOrigin
@RequestMapping("/hotelDescription/")
public class HotelDescriptionController {
    private HotelDescriptionService HOTEL_DESCRIPTION_SERVICE;

    @Autowired
    public HotelDescriptionController(HotelDescriptionService hotelDescriptionService) {
        HOTEL_DESCRIPTION_SERVICE = hotelDescriptionService;
    }

    @PostMapping("write")
    public HashMap<String, Object> write(@RequestBody HotelDescriptionDTO hotelDescriptionDTO, MultipartFile[] file) {
        System.out.println(hotelDescriptionDTO);

        HashMap<String, Object> resultMap = new HashMap();
        try {
            HOTEL_DESCRIPTION_SERVICE.insert(hotelDescriptionDTO);
            resultMap.put("result", "success");
            resultMap.put("resultId", hotelDescriptionDTO.getHotelId());

        } catch (Exception e) {
            e.printStackTrace();
            resultMap.put("result", "fail");
        }
        System.out.println(resultMap);
        return resultMap;
    }

    @PostMapping("update")
    public HashMap<String, Object> update(@RequestBody HotelDescriptionDTO hotelDescriptionDTO) {
        System.out.println(hotelDescriptionDTO);
        HashMap<String, Object> resultMap = new HashMap<>();
        HOTEL_DESCRIPTION_SERVICE.update(hotelDescriptionDTO);

        resultMap.put("resultId", hotelDescriptionDTO.getHotelId());

        return resultMap;
    }
}
