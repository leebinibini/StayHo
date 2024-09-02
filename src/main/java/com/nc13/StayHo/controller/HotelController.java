package com.nc13.StayHo.controller;
import com.nc13.StayHo.model.model.HotelDTO;
import com.nc13.StayHo.service.impl.HotelServiceImpl;
import com.nc13.StayHo.model.model.LocationDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@CrossOrigin
@RequestMapping("/hotels")
@RequiredArgsConstructor
public class HotelController {
    private final HotelServiceImpl hotelService;

    @GetMapping("")
    public ResponseEntity<?> selectList() {
        return ResponseEntity.ok(hotelService.selectAll());
    }
    @GetMapping("/list/{id}")
    public ResponseEntity<?> selectList(@PathVariable int id) {
        return ResponseEntity.ok(hotelService.selectMember(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> selectOne(@PathVariable int id) {
        return ResponseEntity.ok(hotelService.select(id));
    }

    @PostMapping("")
    public ResponseEntity<?> write(
            @RequestPart(value = "hotelDTO") HotelDTO hotelDTO,
            @RequestPart(value = "files", required = false) List<MultipartFile> files,
            @RequestPart("address") LocationDTO locationDTO) {
        return ResponseEntity.ok(hotelService.insert(hotelDTO,locationDTO,files));
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestPart("hotelDTO") HotelDTO hotelDTO, @PathVariable int id) {
        return ResponseEntity.ok(hotelService.update(hotelDTO, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        return ResponseEntity.ok(hotelService.delete(id));
    }
}