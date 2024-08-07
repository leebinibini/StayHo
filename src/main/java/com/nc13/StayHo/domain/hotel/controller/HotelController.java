package com.nc13.StayHo.domain.hotel.controller;

import com.nc13.StayHo.domain.hotel.model.HotelDTO;
import com.nc13.StayHo.domain.hotel.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

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
    public HashMap<String,Object> selectList() {
        System.out.println("hotelList");
        HashMap<String, Object> resultMap = new HashMap<>();
        resultMap.put("hotelList", HOTEL_SERVICE.selectAll());
        System.out.println(resultMap);
        return resultMap;
    }

    @GetMapping("showOne/{id}")
    public HotelDTO selectOne(@PathVariable int id) {
        System.out.println(HOTEL_SERVICE.selectOne(id));
        return HOTEL_SERVICE.selectOne(id);
    }

    // write할 때 이미지 처리 어떻게 할 건지
    @PostMapping("write")
    public HashMap<String, Object> write(@RequestBody HotelDTO hotelDTO) {
        System.out.println(hotelDTO);
        hotelDTO.setMemberId(1);

        HashMap<String, Object> resultMap = new HashMap();
        try {
            HOTEL_SERVICE.insert(hotelDTO);
            resultMap.put("result", "success");
            resultMap.put("resultId", hotelDTO.getId());

        } catch (Exception e) {
            e.printStackTrace();
            resultMap.put("result", "fail");
        }
        System.out.println(resultMap);
        return resultMap;
    }

    @PostMapping("update")
    public HashMap<String, Object> update(@RequestBody HotelDTO hotelDTO) {
        System.out.println(hotelDTO);
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
