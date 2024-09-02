package com.nc13.StayHo.model.mapper;

import com.nc13.StayHo.model.model.HotelDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface HotelMapper {
    List<?> selectAll();

    List<?> selectMember(int memberId);

    HotelDTO select(int id);

    Integer insert(HotelDTO hotelDTO);

    Integer update(HotelDTO hotelDTO);

    Integer delete(int id);

    Integer updateRating(List<?> result);
}
