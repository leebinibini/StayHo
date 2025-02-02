package com.nc13.StayHo.domain.location.controller;

import com.nc13.StayHo.domain.location.service.LocationService;
import com.nc13.StayHo.domain.location.dto.LocationDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
public class LocationController {
    private final LocationService LOCATION_SERVICE;

    public LocationController(LocationService locationService){
        this.LOCATION_SERVICE= locationService;
    }

    @PostMapping("/location/insert")
    public ResponseEntity<Void> insert(@RequestBody LocationDTO locationDTO){
        LOCATION_SERVICE.insert(locationDTO);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/location/update")
    public ResponseEntity<Void> update(@RequestBody LocationDTO locationDTO){
        LOCATION_SERVICE.update(locationDTO);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/location/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id){
        LOCATION_SERVICE.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/location/{id}")
    public LocationDTO select(@PathVariable int id){
        return LOCATION_SERVICE.select(id);
    }

    @GetMapping("/location/sido")
    public ResponseEntity<Map<String, Object>> selectSido(){
        Map<String, Object> resultMap= new HashMap<>();
        resultMap.put("sido", LOCATION_SERVICE.selectSido());
        return ResponseEntity.ok(resultMap);
    }
    @GetMapping("/location/sigungu/{sido}")
    public ResponseEntity<Map<String, Object>> selectSigungu(@PathVariable String sido){
        Map<String, Object> resultMap= new HashMap<>();
        resultMap.put("sigungu", LOCATION_SERVICE.selectSigungu(sido));
        return ResponseEntity.ok(resultMap);
    }
}
