package com.nc13.StayHo.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImgService {
    Integer insertRoom(List<MultipartFile> files, Long roomId);
    Integer insertHotel(List<MultipartFile> files, Long hotelId);
    Integer insertReview(List<MultipartFile> files, Long reviewId);
    Integer delete(int id);
    Integer deleteReviewImgByReviewId(int reviewId);
    List<?> selectRoom(Long id);
    List<?> selectReview(int id);
    List<?> selectHotel(int id);

}
