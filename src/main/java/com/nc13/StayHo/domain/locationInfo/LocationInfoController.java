package com.nc13.StayHo.domain.locationInfo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
public class LocationInfoController {
private final LocationInfoService LOCATIONINFO_SERVICE;

public LocationInfoController(LocationInfoService locationInfoService){
    this.LOCATIONINFO_SERVICE= locationInfoService;
}
@GetMapping("/location/sido")
    public ResponseEntity<Map<String, Object>> selectSido(){
    Map<String, Object> resultMap= new HashMap<>();
    resultMap.put("sido", LOCATIONINFO_SERVICE.selectSido());
    return ResponseEntity.ok(resultMap);
}
@GetMapping("/location/sigungu/{sido}")
    public ResponseEntity<Map<String, Object>> selectSigungu(@PathVariable String sido){
    Map<String, Object> resultMap= new HashMap<>();
    resultMap.put("sigungu", LOCATIONINFO_SERVICE.selectSigungu(sido));
    return ResponseEntity.ok(resultMap);
}
}
