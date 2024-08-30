package com.nc13.StayHo.service.impl;

import com.nc13.StayHo.model.entity.Review;
import com.nc13.StayHo.model.mapper.ReviewMapper;
import com.nc13.StayHo.model.model.ReservationDTO;
import com.nc13.StayHo.model.model.ReviewRegisterDTO;
import com.nc13.StayHo.model.model.ReviewUpdateDTO;
import com.nc13.StayHo.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ReviewMapper mapper;
    private final String imgPath = "D:\\NC13\\StayHo_NC13\\src\\main\\resources\\static\\image\\";
    private final String reviewPath = "review";

    @Override
    public Integer insert(int reservationId, ReviewRegisterDTO registerDTO, List<MultipartFile> files) {
        return 0;
    }

    @Override
    public List<?> getStringObjectHashMap(ReservationDTO reservationDTO) {
        return List.of();
    }

    @Override
    public Review selectOne(int reviewId) {
        return null;
    }

    @Override
    public List<?> selectWithImg(int reviewId) {
        return List.of();
    }

    @Override
    public Integer update(int reviewId, ReviewUpdateDTO reviewUpdateDTO, List<MultipartFile> files) {
        return 0;
    }

    @Override
    public Integer delete(int reviewId) {
        return 0;
    }

    @Override
    public List<?> selectListByHotel(int hotelId) {
        return List.of();
    }

    @Override
    public List<?> selectListByRoom(int roomId) {
        return List.of();
    }

    @Override
    public List<?> searchReviewsByComment(int hotelId, String keyword) {
        return List.of();
    }

    @Override
    public Double averageRating(int hotelId) {
        return 0.0;
    }

    @Override
    public List<?> selectListByMember(int memberId) {
        return List.of();
    }
}
