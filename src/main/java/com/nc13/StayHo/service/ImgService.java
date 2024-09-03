package com.nc13.StayHo.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImgService {
    Integer insertRoom(List<MultipartFile> files, int roomId);
    Integer insertHotel(List<MultipartFile> files, int hotelId);
    Integer updateHotel(List<MultipartFile> files, int[] delList,int hotelId);
    Integer insertReview(List<MultipartFile> files, int reviewId);
    Integer delete(int id);
    Integer deleteReviewImgByReviewId(int reviewId);
    List<?> selectRoom(int id);
    List<?> selectReview(int id);
    List<?> selectHotel(int id);

}
