package com.nc13.StayHo.domain.img.service;

import com.nc13.StayHo.domain.img.dto.HotelImgDTO;
import com.nc13.StayHo.domain.img.dto.ReviewImgDTO;
import com.nc13.StayHo.domain.img.dto.RoomImgDTO;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ImgService {
    private final SqlSession SESSION;
    private final String NAMESPACE="mapper.ImgMapper";

    public void insertRoom(RoomImgDTO roomImgDTO){
        SESSION.insert(NAMESPACE+".insertRoom", roomImgDTO);
    }
    public List<RoomImgDTO> selectRoom(int id){
        return SESSION.selectList(NAMESPACE+".selectRoom", id);
    }
    public List<HotelImgDTO> selectHotel(int id){
        return SESSION.selectList(NAMESPACE+".selectHotel", id);
    }
    public void delete(int id){
        SESSION.delete(NAMESPACE+".delete", id);
    }
    public void insertReviewImg(ReviewImgDTO reviewImgDTO) {
        SESSION.insert(NAMESPACE + ".insertReview", reviewImgDTO);
    }

    public List<ReviewImgDTO> selectReviewImg(int reviewId) {
        return SESSION.selectList(NAMESPACE + ".selectReview", reviewId);
    }

    public void deleteReviewImgByReviewId(int reviewId) {
        SESSION.delete(NAMESPACE + ".deleteReview", reviewId);
    }
}
