package com.nc13.StayHo.domain.review.service;

import com.nc13.StayHo.domain.review.dto.ReviewRegisterDTO;
import com.nc13.StayHo.domain.review.dto.ReviewUpdateDTO;
import com.nc13.StayHo.domain.review.entity.Review;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public List<Review> searchReviewsByComment(int hotelId, String keyword) {
        Map<String, Object> params = new HashMap<>();
        params.put("hotelId", hotelId);
        params.put("keyword", keyword);
        return session.selectList(NAMESPACE + "searchReviewsByComment", params);
    }

    public double averageRating(int hotelId) {
        Double averageRating = session.selectOne(NAMESPACE + "averageRating", hotelId);
        return averageRating != null ? averageRating : 0.0;
    }

    public List<Review> selectListByMember(int memberId) {
        return session.selectList(NAMESPACE + "selectListByMember", memberId);
    }
}
