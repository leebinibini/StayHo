package com.nc13.StayHo.controller;

import com.nc13.StayHo.model.model.ReviewRegisterDTO;
import com.nc13.StayHo.model.model.ReviewUpdateDTO;
import com.nc13.StayHo.service.origin.ReviewService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@CrossOrigin
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;


    @PostMapping("/{reservationId}")
    public ResponseEntity<?> write(@PathVariable int reservationId,
                                   @RequestPart("reviewData") ReviewRegisterDTO reviewRegisterDTO,
                                   @RequestPart("img") List<MultipartFile> files) {

        return ResponseEntity.ok(reviewService.insert(reservationId, reviewRegisterDTO, files));
    }

    @GetMapping("/showAllByHotel/{hotelId}")
    public ResponseEntity<?> showAllByHotel(@PathVariable int hotelId) {
        return ResponseEntity.ok(reviewService.selectListByHotel(hotelId));
    }

    @GetMapping("/averageRating/{hotelId}")
    public ResponseEntity<?> getAverageRating(@PathVariable int hotelId) {
        return ResponseEntity.ok(reviewService.averageRating(hotelId));
    }

    @GetMapping("/searchByComment")
    public ResponseEntity<?> searchByComment(@RequestParam int hotelId, @RequestParam String keyword) {
        return ResponseEntity.ok(reviewService.searchReviewsByComment(hotelId, keyword));
    }

    @GetMapping("/showAllByMember/{memberId}")
    public ResponseEntity<?> showAllByMember(@PathVariable int memberId) {
        return ResponseEntity.ok(reviewService.selectListByMember(memberId));
    }

    @GetMapping("/showAllByRoom/{roomId}")
    public ResponseEntity<?> showAllByRoom(@PathVariable int roomId) {
        return ResponseEntity.ok(reviewService.selectListByRoom(roomId));
    }

    @GetMapping("/{reviewId}")
    public ResponseEntity<?> showOne(@PathVariable int reviewId) {
        return ResponseEntity.ok(reviewService.selectWithImg(reviewId));
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<?> updateReview(
            @PathVariable int reviewId,
            @RequestPart("reviewData") ReviewUpdateDTO reviewUpdateDTO,
            @RequestPart(value = "img", required = false) List<MultipartFile> files) {

        return ResponseEntity.ok(reviewService.update(reviewId, reviewUpdateDTO, files));

    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<?> delete(@PathVariable int reviewId) {
        return ResponseEntity.ok(reviewService.delete(reviewId));
    }



}
