package com.nc13.StayHo.domain.review.controller;

import com.nc13.StayHo.domain.review.dto.ReviewRegisterDTO;
import com.nc13.StayHo.domain.review.dto.ReviewSelectDTO;
import com.nc13.StayHo.domain.review.dto.ReviewUpdateDTO;
import com.nc13.StayHo.domain.review.entity.Review;
import com.nc13.StayHo.domain.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
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

    @GetMapping("showAllByHotel/{hotelId}")
    public HashMap<String, Object> showAllByHotel(@PathVariable int hotelId) {
        HashMap<String, Object> resultMap = new HashMap<>();
        List<Review> reviewList = reviewService.selectListByHotel(hotelId);
        putResultMap(reviewList, resultMap);
        return resultMap;
    }

    @GetMapping("averageRating/{hotelId}")
    public ResponseEntity<HashMap<String, Object>> getAverageRating(@PathVariable int hotelId) {
        HashMap<String, Object> resultMap = new HashMap<>();
        double averageRating = reviewService.averageRating(hotelId);
        resultMap.put("averageRating", averageRating);
        return ResponseEntity.ok(resultMap);
    }

    @GetMapping("searchByComment")
    public HashMap<String, Object> searchByComment(@RequestParam int hotelId, @RequestParam String keyword) {
        HashMap<String, Object> resultMap = new HashMap<>();
        List<Review> reviewList = reviewService.searchReviewsByComment(hotelId, keyword);
        resultMap.put("reviewList", reviewList);
        return resultMap;
    }

    @GetMapping("showAllByRoom/{roomId}")
    public HashMap<String, Object> showAllByRoom(@PathVariable int roomId) {
        HashMap<String, Object> resultMap = new HashMap<>();
        List<Review> reviewList = reviewService.selectListByRoom(roomId);
        putResultMap(reviewList, resultMap);
        return resultMap;
    }

    @GetMapping("get/{reviewId}")
    public ResponseEntity<HashMap<String, Object>> getReview(@PathVariable int reviewId) {
        HashMap<String, Object> resultMap = new HashMap<>();
        try {
            Review review = reviewService.selectOne(reviewId);
            resultMap.put("review", review);
            return ResponseEntity.ok(resultMap);
        } catch (Exception e) {
            e.printStackTrace();
            resultMap.put("result", "fail");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(resultMap);
        }
    }

    @PutMapping("update/{reviewId}")
    public ResponseEntity<HashMap<String, Object>> updateReview(@PathVariable int reviewId, @RequestBody ReviewUpdateDTO reviewUpdateDTO) {
        HashMap<String, Object> resultMap = new HashMap<>();
        try {
            reviewUpdateDTO.setId(reviewId);
            reviewService.update(reviewUpdateDTO);
            resultMap.put("result", "success");
            return ResponseEntity.ok(resultMap);
        } catch (Exception e) {
            e.printStackTrace();
            resultMap.put("result", "fail");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(resultMap);
        }
    }

    @GetMapping("delete/{reviewId}")
    public ResponseEntity<Void> delete(@PathVariable int reviewId) {
        reviewService.delete(reviewId);
        return ResponseEntity.ok().build();
    }

    private static void putResultMap(List<Review> reviewList, HashMap<String, Object> resultMap) {
        List<ReviewSelectDTO> reviewDTOList = reviewList.stream()
                .map(review -> new ReviewSelectDTO(
                        review.getId(),
                        review.getComment(),
                        review.getRating(),
                        review.getCreatedAt(),
                        review.getUpdatedAt(),
                        review.getMemberId(),
                        review.getMemberName()))
                .collect(Collectors.toList());

        resultMap.put("reviewList", reviewDTOList);
    }
}
