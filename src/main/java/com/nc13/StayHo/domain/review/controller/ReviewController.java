package com.nc13.StayHo.domain.review.controller;

import com.nc13.StayHo.domain.img.dto.ReviewImgDTO;
import com.nc13.StayHo.domain.img.service.ImgService;
import com.nc13.StayHo.domain.review.dto.ReviewRegisterDTO;
import com.nc13.StayHo.domain.review.dto.ReviewSelectDTO;
import com.nc13.StayHo.domain.review.dto.ReviewUpdateDTO;
import com.nc13.StayHo.domain.review.entity.Review;
import com.nc13.StayHo.domain.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@CrossOrigin
@RequiredArgsConstructor
@RestController
@RequestMapping("/review/")
public class ReviewController {

    private final ReviewService reviewService;
    private final ImgService imgService;
    private final String imgPath = "src/main/resources/static/image/";
    private final String reviewPath = "review";

    @PostMapping("insert/{reservationId}")
    public ResponseEntity<Void> write(@PathVariable int reservationId,
                                      @RequestPart("reviewData") ReviewRegisterDTO reviewRegisterDTO,
                                      @RequestPart("img") List<MultipartFile> files) {

        reviewRegisterDTO.setReservationId(reservationId);
        reviewService.insert(reviewRegisterDTO);
        insertImg(reviewRegisterDTO.getId(), files);
        return ResponseEntity.ok().build();
    }

    @GetMapping("showAllByHotel/{hotelId}")
    public ResponseEntity<HashMap<String, Object>> showAllByHotel(@PathVariable int hotelId) {
        HashMap<String, Object> resultMap = new HashMap<>();
        List<Review> reviewList = reviewService.selectListByHotel(hotelId);
        putResultMap(reviewList, resultMap);
        return ResponseEntity.ok(resultMap);
    }

    @GetMapping("averageRating/{hotelId}")
    public ResponseEntity<HashMap<String, Object>> getAverageRating(@PathVariable int hotelId) {
        HashMap<String, Object> resultMap = new HashMap<>();
        double averageRating = reviewService.averageRating(hotelId);
        resultMap.put("averageRating", averageRating);
        return ResponseEntity.ok(resultMap);
    }

    @GetMapping("searchByComment")
    public ResponseEntity<HashMap<String, Object>> searchByComment(@RequestParam int hotelId, @RequestParam String keyword) {
        HashMap<String, Object> resultMap = new HashMap<>();
        List<Review> reviewList = reviewService.searchReviewsByComment(hotelId, keyword);
        putResultMap(reviewList, resultMap);
        return ResponseEntity.ok(resultMap);
    }

    @GetMapping("showAllByMember/{memberId}")
    public ResponseEntity<HashMap<String, Object>> showAllByMember(@PathVariable int memberId) {
        HashMap<String, Object> resultMap = new HashMap<>();
        List<Review> reviewList = reviewService.selectListByMember(memberId);
        putResultMap(reviewList, resultMap);
        return ResponseEntity.ok(resultMap);
    }

    @GetMapping("showAllByRoom/{roomId}")
    public HashMap<String, Object> showAllByRoom(@PathVariable int roomId) {
        HashMap<String, Object> resultMap = new HashMap<>();
        List<Review> reviewList = reviewService.selectListByRoom(roomId);
        putResultMap(reviewList, resultMap);
        return resultMap;
    }

    @GetMapping("showOne/{reviewId}")
    public ResponseEntity<HashMap<String, Object>> showOne(@PathVariable int reviewId) {
        HashMap<String, Object> resultMap = new HashMap<>();
        try {
            Review review = reviewService.selectOne(reviewId);
            resultMap.put("review", review);

            List<ReviewImgDTO> images = imgService.selectReviewImg(reviewId);
            resultMap.put("images", images);

            return ResponseEntity.ok(resultMap);
        } catch (Exception e) {
            e.printStackTrace();
            resultMap.put("result", "fail");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(resultMap);
        }
    }

    @PutMapping("update/{reviewId}")
    public ResponseEntity<HashMap<String, Object>> updateReview(
            @PathVariable int reviewId,
            @RequestPart("reviewData") ReviewUpdateDTO reviewUpdateDTO,
            @RequestPart(value = "img", required = false) List<MultipartFile> files) {

        HashMap<String, Object> resultMap = new HashMap<>();
        try {
            reviewUpdateDTO.setId(reviewId);
            reviewService.update(reviewUpdateDTO);

            insertImg(reviewId, files);

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

    private void putResultMap(List<Review> reviewList, HashMap<String, Object> resultMap) {
        String baseImgUrl = "http://localhost:8080/image/" + reviewPath + "/";

        List<ReviewSelectDTO> reviewDTOList = reviewList.stream()
                .map(review -> {
                    List<ReviewImgDTO> reviewImages = imgService.selectReviewImg(review.getId());

                    List<String> imgUrls = reviewImages.stream()
                            .map(img -> baseImgUrl + img.getFilename())
                            .collect(Collectors.toList());

                    return new ReviewSelectDTO(
                            review.getId(),
                            review.getComment(),
                            review.getRating(),
                            review.getCreatedAt(),
                            review.getUpdatedAt(),
                            review.getMemberId(),
                            review.getMemberName(),
                            imgUrls
                    );
                })
                .collect(Collectors.toList());

        resultMap.put("reviewList", reviewDTOList);
    }

    private void insertImg(int reviewId, List<MultipartFile> files) {
        if (!files.isEmpty()) {
            File filepath = new File(imgPath + reviewPath);
            if (!filepath.exists()) {
                new File(imgPath + reviewPath).mkdirs();
            }
            for (MultipartFile file : files) {
                String fileName = file.getOriginalFilename();
                String extension = fileName.substring(fileName.lastIndexOf("."));
                String uploadName = UUID.randomUUID() + extension;
                String path = imgPath + reviewPath;
                ReviewImgDTO reviewImgDTO = new ReviewImgDTO(imgPath + reviewPath, uploadName, reviewId);
                File target = new File(path, uploadName);
                try {
                    file.transferTo(target);
                } catch (IOException e) {
                    e.printStackTrace();
                }
                imgService.insertReviewImg(reviewImgDTO);
            }
        }
    }
}
