package com.nc13.StayHo.controller;


import com.nc13.StayHo.service.RoomService;
import com.nc13.StayHo.model.model.SynthesisDTO;
import com.nc13.StayHo.service.RoomDescriptionService;
import com.nc13.StayHo.model.model.SearchConditionDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {
    private final RoomService roomService;
    private final RoomDescriptionService descriptionService;

    @PostMapping("")
    public ResponseEntity<?> insert(@RequestPart(value = "params") SynthesisDTO params,
                                       @RequestPart(value = "files", required = false) List<MultipartFile> files) {
        return ResponseEntity.ok(roomService.insert(params, files));
    }

    @GetMapping("")
    public ResponseEntity<List<?>> getList(@RequestParam Long hotelId) {
        return ResponseEntity.ok(roomService.selectByHotel(hotelId));
    }

    @GetMapping("/search")
    public ResponseEntity<List<?>> getList(@RequestBody SearchConditionDTO condition) {
        return ResponseEntity.ok(roomService.selectByHotelForSearch(condition));
    }

    @GetMapping("/description/{id}")
    public ResponseEntity<?> getByIdDescription(@PathVariable Long id) {
        return ResponseEntity.ok(descriptionService.selectByRoom(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return ResponseEntity.ok(roomService.selectWImg(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id,
                                       @RequestPart(value = "params") SynthesisDTO params,
                                       @RequestPart(value = "files", required = false) List<MultipartFile> files,
                                       @RequestPart(value = "delImgList", required = false) int[] delImgList) {

        return ResponseEntity.ok(roomService.update(id, params, files, delImgList));
    }

    @DeleteMapping("")
    public ResponseEntity<?> delete(@RequestBody Long[] checkInputs) {

        return ResponseEntity.ok(roomService.delete(checkInputs));
    }
}

