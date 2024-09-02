package com.nc13.StayHo.controller;

import com.nc13.StayHo.model.model.WishListDTO;
import com.nc13.StayHo.service.impl.WishListServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/wishes")
@RequiredArgsConstructor
public class WishListController {
    private final WishListServiceImpl wishListService;


    @PostMapping("")
    public ResponseEntity<?> insert(@RequestBody WishListDTO wishListDTO) {
        return ResponseEntity.ok(wishListService.insert(wishListDTO));
    }

    @GetMapping("/list")
    public ResponseEntity<List<?>> getList(@RequestParam("memberId") int memberId) {
        return ResponseEntity.ok(wishListService.selectAll(memberId));
    }

    @GetMapping("check")
    public ResponseEntity<?> getExists(@RequestParam("hotelId") int hotelId, @RequestParam("memberId") int memberId) {
        return ResponseEntity.ok(wishListService.selectOne(new WishListDTO(hotelId, memberId)) != null);
    }


    @DeleteMapping("")
    public ResponseEntity<?> delete(@RequestBody WishListDTO wishListDTO) {
        return ResponseEntity.ok(wishListService.delete(wishListDTO));

    }
}
