package com.nc13.StayHo.domain.review.controller;

import com.nc13.StayHo.domain.review.dto.ReviewRegisterDTO;
import com.nc13.StayHo.domain.review.dto.ReviewUpdateDTO;
import com.nc13.StayHo.domain.review.entity.Review;
import com.nc13.StayHo.domain.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/review/")
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("insert/{reservationId}")
    public HashMap<String, Object> write(@PathVariable int reservationId, @RequestBody ReviewRegisterDTO reviewRegisterDTO) {
        reviewRegisterDTO.setReservationId(reservationId);
        HashMap<String, Object> resultMap = new HashMap();
        try {
            reviewService.insert(reviewRegisterDTO);
            resultMap.put("result", "success");
        } catch (Exception e) {
            e.printStackTrace();
            resultMap.put("result", "fail");
        }
        return resultMap;
    }

    @GetMapping("showList/{hotelId}")
    public HashMap<String, Object> showAll(@PathVariable int hotelId) {
        HashMap<String, Object> resultMap = new HashMap<>();
        List<Review> reviewList = reviewService.selectAll(hotelId);

        resultMap.put("reviewList", reviewList);
        return resultMap;
    }

    @PostMapping("update/{reviewId}")
    public HashMap<String, Object> update(@PathVariable int reviewId, @RequestBody ReviewUpdateDTO reviewUpdateDTO) {
        Review review = reviewService.selectOne(reviewId);

        reviewUpdateDTO.setId(reviewId);
        reviewUpdateDTO.setComment(review.getComment());
        reviewUpdateDTO.setRating(review.getRating());

        HashMap<String, Object> resultMap = new HashMap<>();

        try {
            reviewService.update(reviewUpdateDTO);
            resultMap.put("result", "success");
        } catch (Exception e) {
            e.printStackTrace();
            resultMap.put("result", "fail");
        }
        return resultMap;
    }

    @GetMapping("delete/{reviewId}")
    public ResponseEntity<Void> delete(@PathVariable int reviewId) {
        reviewService.delete(reviewId);
        return ResponseEntity.ok().build();
    }
}
