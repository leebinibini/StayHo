package com.nc13.StayHo.service;

import com.nc13.StayHo.model.entity.Review;
import com.nc13.StayHo.model.model.ReservationDTO;
import com.nc13.StayHo.model.model.ReviewRegisterDTO;
import com.nc13.StayHo.model.model.ReviewUpdateDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ReviewService {
    Integer insert(int reservationId, ReviewRegisterDTO registerDTO, List<MultipartFile> files);
    List<?> getStringObjectHashMap(ReservationDTO reservationDTO);
    Review selectOne(int reviewId);
    List<?> selectWithImg(int reviewId);
    Integer update(int reviewId, ReviewUpdateDTO reviewUpdateDTO, List<MultipartFile> files);
    Integer delete(int reviewId);
    List<?> selectListByHotel(int hotelId);
    List<?> selectListByRoom(int roomId);
    List<?> searchReviewsByComment(int hotelId, String keyword);
    Double averageRating(int hotelId);
    List<?> selectListByMember(int memberId);

}
