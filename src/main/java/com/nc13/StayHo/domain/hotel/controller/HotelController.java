package com.nc13.StayHo.domain.hotel.controller;

import com.nc13.StayHo.domain.hotel.entity.Hotel;
import com.nc13.StayHo.domain.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequiredArgsConstructor
@RequestMapping("/hotel/")
public class HotelController {

    private final ReviewService reviewService;

    @GetMapping("/showOne/{hotelId}")
    public Hotel showOne(@PathVariable int hotelId) {
        reviewService.selectAll(hotelId);
        return new Hotel();
    }
}
