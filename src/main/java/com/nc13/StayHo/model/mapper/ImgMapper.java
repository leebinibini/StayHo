package com.nc13.StayHo.model.mapper;

import com.nc13.StayHo.model.model.HotelImgDTO;
import com.nc13.StayHo.model.model.RoomImgDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.security.core.parameters.P;

import java.util.ArrayList;
import java.util.List;

@Mapper
public interface ImgMapper {
    List<?> selectHotel(@Param("id") int id);

    Integer insertRoom(RoomImgDTO roomImgDTO);

    Integer delete(@Param("id") int id);

    Integer deleteReview(@Param("reviewId") int reviewId);

    List<?> selectRoom(@Param("id") Long id);

    List<?> selectReview(@Param("id") int id);

    Integer insertHotel(@Param("hotelDTO") HotelImgDTO hotelImgDTO);

    Integer updateHotel(@Param("hotelDTO") HotelImgDTO hotelImgDTO);
}
