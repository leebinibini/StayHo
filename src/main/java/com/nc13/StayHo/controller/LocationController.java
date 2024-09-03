package com.nc13.StayHo.controller;

import com.nc13.StayHo.service.impl.LocationServiceImpl;
import com.nc13.StayHo.model.model.LocationDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/locations")
public class LocationController {
    private final LocationServiceImpl locationService;

    @PostMapping("")
    public ResponseEntity<?> insert(@RequestBody LocationDTO locationDTO){
        return ResponseEntity.ok(locationService.insert(locationDTO)==1);
    }

    @PutMapping("")
    public ResponseEntity<?> update(@RequestBody LocationDTO locationDTO){
        return ResponseEntity.ok(locationService.update(locationDTO)==1);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id){
        return ResponseEntity.ok(locationService.delete(id)==1);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable int id){
        return ResponseEntity.ok(locationService.select(id));
    }

    @GetMapping("/sido")
    public ResponseEntity<List<?>> getList(){
        return ResponseEntity.ok(locationService.selectSido());
    }
    @GetMapping("/sigungu/{sido}")
    public ResponseEntity<List<?>> getBySido(@PathVariable String sido){
        return ResponseEntity.ok(locationService.selectSigungu(sido));
    }
}
