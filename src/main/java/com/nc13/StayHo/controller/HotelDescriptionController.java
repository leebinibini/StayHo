package com.nc13.StayHo.controller;

import com.nc13.StayHo.model.model.HotelDescriptionDTO;
import com.nc13.StayHo.service.impl.HotelDescriptionServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
@RequestMapping("/hotelDescription")
@RequiredArgsConstructor
public class HotelDescriptionController {
    private final HotelDescriptionServiceImpl hotelDescriptionService;

    @GetMapping("/{id}")
    public ResponseEntity<?> selectOne(@PathVariable int id) {
        return ResponseEntity.ok(hotelDescriptionService.select(id));
    }

    @PostMapping("")
    public ResponseEntity<?> write(@RequestBody HotelDescriptionDTO hotelDescriptionDTO) {
        return ResponseEntity.ok(hotelDescriptionService.insert(hotelDescriptionDTO));
    }

    @PutMapping("")
    public ResponseEntity<?> update(@RequestBody HotelDescriptionDTO hotelDescriptionDTO) {
        return ResponseEntity.ok(hotelDescriptionService.update(hotelDescriptionDTO));
    }
}
