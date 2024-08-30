//package com.nc13.StayHo.domain.review.controller;
//
//import com.nc13.StayHo.model.model.ReviewRegisterDTO;
//import com.nc13.StayHo.service.origin.ReviewService;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.transaction.annotation.Transactional;
//
//@SpringBootTest
//@Transactional
//class ReviewControllerTest {
//
//    @Autowired
//    private ReviewService reviewService;
//
//    @Test
//    void insert() {
//        ReviewRegisterDTO review = new ReviewRegisterDTO();
//        review.setReservationId(1);
//        review.setRating(1);
//        review.setComment("123");
//        reviewService.insert(review);
//    }
//
//}