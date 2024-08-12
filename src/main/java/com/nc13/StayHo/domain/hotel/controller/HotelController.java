//package com.nc13.StayHo.domain.hotel.controller;
//
//import com.nc13.StayHo.domain.review.dto.ReviewSelectDTO;
//import com.nc13.StayHo.domain.review.entity.Review;
//import com.nc13.StayHo.domain.review.service.ReviewService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@RestController
//@RequiredArgsConstructor
//@CrossOrigin
//@RequestMapping("/hotel/")
//public class HotelController {
//
//    private final ReviewService reviewService;
//
//    @GetMapping("/showOne/{hotelId}")
//    public HashMap<String, Object> showOne(@PathVariable int hotelId) {
//        HashMap<String, Object> resultMap = new HashMap<>();
//        List<Review> reviewList = reviewService.selectListByHotel(hotelId);
//        List<ReviewSelectDTO> reviewDTOList = reviewList.stream()
//                .map(review -> new ReviewSelectDTO(
//                        review.getId(),
//                        review.getComment(),
//                        review.getRating(),
//                        review.getCreatedAt(),
//                        review.getUpdatedAt(),
//                        review.getMemberId()))
//                .collect(Collectors.toList());
//
//        resultMap.put("reviewList", reviewDTOList);
//        return resultMap;
//    }
//}
