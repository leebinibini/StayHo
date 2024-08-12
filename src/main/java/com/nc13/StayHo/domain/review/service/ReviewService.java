package com.nc13.StayHo.domain.review.service;

import com.nc13.StayHo.domain.review.dto.ReviewRegisterDTO;
import com.nc13.StayHo.domain.review.dto.ReviewUpdateDTO;
import com.nc13.StayHo.domain.review.entity.Review;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final SqlSession session;
    private final String NAMESPACE = "mapper.ReviewMapper.";

    public void insert(ReviewRegisterDTO reviewRegisterDTO) {
        session.insert(NAMESPACE + "insert", reviewRegisterDTO);
    }

    public Review selectOne(int reviewId) {
        return session.selectOne(NAMESPACE + "selectOne", reviewId);
    }

    public void update(ReviewUpdateDTO reviewUpdateDTO) {
        session.update(NAMESPACE + "update", reviewUpdateDTO);
    }

    public void delete(int reviewId) {
        session.delete(NAMESPACE + "delete", reviewId);
    }

    public List<Review> selectListByHotel(int hotelId) {
        return session.selectList(NAMESPACE + "selectListByHotel", hotelId);
    }

    public List<Review> selectListByRoom(int roomId) {
        return session.selectList(NAMESPACE + "selectListByRoom", roomId);
    }
}
